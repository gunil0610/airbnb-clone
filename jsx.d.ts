import { ReactNode } from "react";
declare global {
    namespace JSX {
        type ElementTypes =
            | keyof JSX.IntrinsicElements
            | ((props: any) => Promise<Element> | Element);
    }
}
