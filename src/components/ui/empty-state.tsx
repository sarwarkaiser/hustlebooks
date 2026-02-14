"use client"

import { FileText, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface EmptyStateProps {
    title: string
    description: string
    actionLabel: string
    actionHref: string
}

export function EmptyState({ title, description, actionLabel, actionHref }: EmptyStateProps) {
    return (
        <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                    {description}
                </p>
                <Button asChild>
                    <Link href={actionHref}>
                        <Plus className="mr-2 h-4 w-4" />
                        {actionLabel}
                    </Link>
                </Button>
            </div>
        </div>
    )
}
