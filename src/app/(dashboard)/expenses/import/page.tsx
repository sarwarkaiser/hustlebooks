"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2 } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface ParsedTransaction {
  date: string;
  description: string;
  amount: number;
  category?: string;
}

const BANK_FORMATS = {
  rbc: { name: "RBC Royal Bank", delimiter: ",", dateCol: 0, descCol: 4, amountCol: 1 },
  td: { name: "TD Bank", delimiter: ",", dateCol: 0, descCol: 3, amountCol: 4 },
  scotiabank: { name: "Scotiabank", delimiter: ",", dateCol: 0, descCol: 2, amountCol: 3 },
  bmo: { name: "BMO", delimiter: ",", dateCol: 0, descCol: 4, amountCol: 2 },
  cibc: { name: "CIBC", delimiter: ",", dateCol: 0, descCol: 2, amountCol: 3 },
  generic: { name: "Generic CSV", delimiter: ",", dateCol: 0, descCol: 1, amountCol: 2 },
};

const CRA_CATEGORIES = [
  "Motor Vehicle Expenses",
  "Meals and Entertainment",
  "Office Expenses",
  "Advertising",
  "Phone and Internet",
  "Professional Fees",
  "Rent",
  "Insurance",
  "Bank Charges",
  "Supplies",
  "Licenses and Permits",
  "Subscriptions and Software",
  "Home Office",
  "Equipment",
  "Training and Education",
];

export default function ImportExpensesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [bankFormat, setBankFormat] = useState("generic");
  const [parsedData, setParsedData] = useState<ParsedTransaction[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importStats, setImportStats] = useState({ success: 0, failed: 0 });
  
  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setParsedData([]);
      setImportStats({ success: 0, failed: 0 });
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
    }
  };

  const parseCSV = async () => {
    if (!file) return;
    
    setIsParsing(true);
    const format = BANK_FORMATS[bankFormat as keyof typeof BANK_FORMATS];
    
    try {
      const text = await file.text();
      const lines = text.split("\n").filter(line => line.trim());
      const transactions: ParsedTransaction[] = [];
      
      // Skip header row
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(format.delimiter).map(c => c.trim().replace(/"/g, ""));
        
        if (cols.length >= Math.max(format.dateCol, format.descCol, format.amountCol) + 1) {
          const amount = parseFloat(cols[format.amountCol].replace(/[$,]/g, ""));
          
          // Skip positive amounts (income) or zero
          if (amount >= 0) continue;
          
          transactions.push({
            date: formatDate(cols[format.dateCol]),
            description: cols[format.descCol],
            amount: Math.abs(amount),
            category: suggestCategory(cols[format.descCol]),
          });
        }
      }
      
      setParsedData(transactions);
      toast({
        title: "CSV Parsed",
        description: `Found ${transactions.length} expense transactions`,
      });
    } catch (error) {
      toast({
        title: "Parse Error",
        description: "Could not parse CSV. Check the format.",
        variant: "destructive",
      });
    } finally {
      setIsParsing(false);
    }
  };

  const formatDate = (dateStr: string): string => {
    // Try various formats
    const formats = [
      // MM/DD/YYYY
      (d: string) => {
        const [m, day, y] = d.split("/");
        return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`;
      },
      // YYYY-MM-DD
      (d: string) => d,
      // DD/MM/YYYY
      (d: string) => {
        const [day, m, y] = d.split("/");
        return `${y}-${m.padStart(2, "0")}-${day.padStart(2, "0")}`;
      },
    ];
    
    for (const fmt of formats) {
      try {
        const result = fmt(dateStr);
        if (!isNaN(Date.parse(result))) return result;
      } catch {}
    }
    return dateStr;
  };

  const suggestCategory = (description: string): string => {
    const desc = description.toLowerCase();
    const keywords: Record<string, string> = {
      "gas": "Motor Vehicle Expenses",
      "shell": "Motor Vehicle Expenses",
      "esso": "Motor Vehicle Expenses",
      "petro": "Motor Vehicle Expenses",
      "uber": "Motor Vehicle Expenses",
      "restaurant": "Meals and Entertainment",
      "mcdonald": "Meals and Entertainment",
      "tim hortons": "Meals and Entertainment",
      "starbucks": "Meals and Entertainment",
      "staples": "Office Expenses",
      "best buy": "Equipment",
      "amazon": "Supplies",
      "phone": "Phone and Internet",
      "rogers": "Phone and Internet",
      "bell": "Phone and Internet",
      "telus": "Phone and Internet",
      "insurance": "Insurance",
      "software": "Subscriptions and Software",
      "adobe": "Subscriptions and Software",
      "zoom": "Subscriptions and Software",
    };
    
    for (const [keyword, category] of Object.entries(keywords)) {
      if (desc.includes(keyword)) return category;
    }
    return "Office Expenses";
  };

  const importTransactions = async () => {
    if (parsedData.length === 0) return;
    
    setIsImporting(true);
    const supabase = createSupabaseBrowserClient();
    let success = 0;
    let failed = 0;
    
    for (const transaction of parsedData) {
      try {
        const { error } = await supabase.from("expense_transactions").insert({
          date: transaction.date,
          description: transaction.description,
          amount: transaction.amount,
          vendor: transaction.description,
          payment_method: "Bank Import",
        });
        
        if (error) {
          failed++;
          console.error("Import error:", error);
        } else {
          success++;
        }
      } catch {
        failed++;
      }
    }
    
    setImportStats({ success, failed });
    toast({
      title: "Import Complete",
      description: `${success} imported, ${failed} failed`,
    });
    
    if (success > 0) {
      setTimeout(() => router.push("/expenses"), 2000);
    }
    
    setIsImporting(false);
  };

  const updateTransactionCategory = (index: number, category: string) => {
    const updated = [...parsedData];
    updated[index].category = category;
    setParsedData(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Import Bank Transactions</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" />
            Upload CSV File
          </CardTitle>
          <CardDescription>
            Download your transactions from your bank and upload the CSV file here.
            We support RBC, TD, Scotiabank, BMO, and CIBC formats.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <Label>Bank Format</Label>
              <Select value={bankFormat} onValueChange={setBankFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(BANK_FORMATS).map(([key, format]) => (
                    <SelectItem key={key} value={key}>
                      {format.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>CSV File</Label>
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>

            <Button 
              onClick={parseCSV} 
              disabled={!file || isParsing}
              className="w-full"
            >
              {isParsing ? (
                "Parsing..."
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Parse CSV
                </>
              )}
            </Button>
          </div>

          {parsedData.length > 0 && (
            <div className="border rounded-lg p-4 bg-slate-900/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  {parsedData.length} Transactions Found
                </h3>
                <Button 
                  onClick={importTransactions} 
                  disabled={isImporting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isImporting ? "Importing..." : "Import All"}
                </Button>
              </div>

              {importStats.success > 0 && (
                <div className="flex items-center gap-2 text-green-400 mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{importStats.success} imported successfully</span>
                </div>
              )}

              <div className="max-h-96 overflow-y-auto space-y-2">
                {parsedData.map((transaction, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{transaction.description}</p>
                      <p className="text-sm text-slate-400">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-400">
                        -${transaction.amount.toFixed(2)}
                      </p>
                    </div>
                    <Select
                      value={transaction.category}
                      onValueChange={(val) => updateTransactionCategory(idx, val)}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CRA_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            How to Export from Your Bank
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-400">
          <div>
            <h4 className="font-semibold text-white mb-1">RBC Online Banking</h4>
            <p>Account Summary → Download Transactions → Select Date Range → CSV</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">TD EasyWeb</h4>
            <p>Accounts → Download Account Activity → Select dates → Export as CSV</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">Scotiabank</h4>
            <p>Account Details → Export → Select dates → CSV format</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">BMO</h4>
            <p>Account Activity → Download → Date range → CSV</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-1">CIBC</h4>
            <p>Account → Download Transactions → Date range → CSV</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
