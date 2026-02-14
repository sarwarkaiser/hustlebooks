import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function RecentSales({ sales = [] }: { sales?: any[] }) {
    if (sales.length === 0) {
        return (
            <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">No recent transactions</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {sales.map((sale, i) => (
                <div key={i} className="flex items-center">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={`/avatars/0${(i % 3) + 1}.png`} alt="Avatar" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{sale.description || "Transaction"}</p>
                        <p className="text-sm text-muted-foreground">
                            {new Date(sale.date).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">+${sale.amount.toFixed(2)}</div>
                </div>
            ))}
        </div>
    )
}
