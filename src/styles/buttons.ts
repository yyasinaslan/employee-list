import {css} from "lit";

export const buttonStyles = css`
    button, a.button {
        --button-bg: hsl(0 0 90%);
        --button-fg: hsl(0 0 10%);
        --button-border: hsl(var(--border));
        --button-focus-ring: hsl(var(--border));

        display: inline-flex;
        align-items: center;
        justify-content: center;

        font-size: inherit;
        line-height: inherit;
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
            --button-focus-ring: hsl(var(--primary));
        }

        &.secondary {
            --button-bg: hsl(var(--secondary));
            --button-fg: hsl(var(--secondary-foreground));
            --button-border: hsl(var(--secondary));
            --button-focus-ring: hsl(var(--secondary));
        }


        &.destructive {
            --button-bg: hsl(var(--destructive));
            --button-fg: hsl(var(--destructive-foreground));
            --button-border: hsl(var(--destructive));
            --button-focus-ring: hsl(var(--destructive));
        }

        &.ghost {
            --button-bg: transparent;
            --button-fg: hsl(var(--foreground));
            --button-border: transparent;
            --button-focus-ring: hsl(var(--foreground) / 70%);
        }

        &.icon {
            aspect-ratio: 1;
            padding: 0.5rem;
            border-radius: 50rem;
        }

        &:disabled, &[disabled] {
            opacity: 0.5;
            cursor: not-allowed;

            &:hover {
                background-color: var(--button-bg) !important;
            }
        }

        &:hover {
            background-color: color-mix(in hsl, var(--button-bg), black 10%);
        }

        &:active {
            background-color: color-mix(in hsl, var(--button-bg), black 20%);
        }

        &:focus-visible {
            outline: 2px solid var(--button-focus-ring);
            outline-offset: 1px;
        }
    }

`