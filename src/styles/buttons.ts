import {css} from "lit";

export const buttonStyles = css`
    button {
        --button-bg: hsl(0 0 90%);
        --button-fg: hsl(0 0 10%);
        --button-border: hsl(var(--border));

        border: 1px solid var(--button-border);
        padding: 0.5rem 1rem;
        border-radius: var(--radius, 0.5rem);
        cursor: pointer;

        background-color: var(--button-bg);
        color: var(--button-fg);

        transition: background-color 0.25s, color 0.25s, border-color 0.25s;

        &.primary {
            --button-bg: hsl(var(--primary));
            --button-fg: hsl(var(--primary-foreground));
            --button-border: hsl(var(--primary));
        }

        &.secondary {
            --button-bg: hsl(var(--secondary));
            --button-fg: hsl(var(--secondary-foreground));
            --button-border: hsl(var(--secondary));
        }

        &:hover {
            background-color: color-mix(in hsl, var(--button-bg), black 10%);
        }

        &:active {
            background-color: color-mix(in hsl, var(--button-bg), black 20%);
        }

        &:focus-visible {
            outline: 2px solid var(--button-bg);
            outline-offset: 1px;
        }
    }

`