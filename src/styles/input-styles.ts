import {css} from "lit";


export const inputStyles = css`
    input, select {
        padding: 0.5rem 1rem;
        background: hsl(var(--input));
        color: hsl(var(--foreground));
        border: 1px solid hsl(var(--border));
        border-radius: var(--radius);
        
        font-size: inherit;
        line-height: inherit;
    }
`