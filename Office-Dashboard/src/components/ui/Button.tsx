import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonVarient = "primary" | "secondary" | "danger" | "success" | "outline" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children : ReactNode;
    varient? : ButtonVarient;
    size? : ButtonSize;
    fullWidth? : boolean;
    className? : string;
}

const varientStyles : Record<ButtonVarient, string> = {
    primary: "bg-indigo-500 text-white hover:bg-indigo-800 focus:ring-indigo-500",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500",
    danger: "bg-red-500 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-500 text-white hover:bg-green-700 focus:ring-green-500",
    outline: "border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
}

export default function Button({
    children,
    varient = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    ...props
}:ButtonProps){
    return(
        <button
            className={`inline-flex items-center justify-center gap-2
                font-semibold rounded-lg
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                ${varientStyles[varient]}
                ${sizeStyles[size]}
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    )
}