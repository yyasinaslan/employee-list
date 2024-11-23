import {resetStyles} from "./reset.ts";
import {buttonStyles} from "./buttons.ts";
import {linkStyles} from "./links.ts";
import {inputStyles} from "./input-styles.ts";
import {css} from "lit";
import {formStyles} from "./form-styles.ts";


export const sharedStyles = [
    resetStyles,
    buttonStyles,
    linkStyles,
    inputStyles,
    css`
        .text-destructive {
            color: hsl(var(--destructive));
        }

        .flex {
            display: flex;
            align-items: center;
        }

        .gap-1 {
            gap: 0.5rem;
        }
        .gap-2 {
            gap: 1rem;
        }

        .flex-auto {
            flex: 1 1 auto;
        }

        .badge {
            font-size: 0.85em;
            line-height: 0.85em;
            padding: 0.4rem 0.5rem;
            border-radius: var(--radius);
            background: hsl(var(--accent));
            color: hsl(var(--accent-foreground));
        }

        .bold {
            font-weight: bold;
        }

        .small {
            font-size: 0.85em;
        }

        dialog {
            border-radius: var(--radius);
            border: 1px solid hsl(var(--border));
            box-shadow: 3px 3px 10px hsl(0 0 0% / 50%);

            &::backdrop {
                background-color: hsl(var(--background) / 70%);
                backdrop-filter: blur(5px);
            }
        }
        
        dl {
            
            dt {
                font-size: .8em;
                font-weight: bold;
            }
            
            dd {
                margin-bottom: 0.5rem;
            }
        }

        dialog[open] {
            display: grid;
            gap: 1.5rem;
            padding: 1.5rem;
        }

        svg.icon {
            height: 1em;
        }
    `
]