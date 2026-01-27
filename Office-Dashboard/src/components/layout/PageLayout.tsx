import type { ReactNode } from "react";

interface PageLayoutProps{
    children : ReactNode,
    sidebar?:ReactNode
}

export function PageLayout({children,sidebar}:PageLayoutProps){
    return (
        <div className="flex min-h-screen bg-gray-100">
            {sidebar}
            <main className="flex-1 min-h-screen overflow-y-auto">{children}</main>
        </div>
    );
}


interface PageContentProps{
    children : ReactNode,
    className? : ReactNode
}
export function PageContent({children,className}:PageContentProps){
    return (
        <div className={`p-4 sm:p-6 md:p-8 lg:p-10 ${className}`}>{children}</div>
    );
}

interface PageHeaderProps{
    title : string,
    subtitle? : string,
    actions? : ReactNode,
    backButton? :ReactNode,
    icon?: ReactNode
}

export function PageHeader({title, subtitle, actions,backButton,icon}:PageHeaderProps){
    return (
        <div className="mb-6 sm:mb-8">
        {backButton && <div className="mb-4">{backButton}</div>}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
            {icon && <span className="text-2xl sm:text-3xl">{icon}</span>}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {title}
                </h1>
                {subtitle && (
                <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
                )}
            </div>
            </div>
            {actions && <div className="flex gap-3 flex-wrap">{actions}</div>}
        </div>
        </div>
    )
}