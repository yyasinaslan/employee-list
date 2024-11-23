import {css} from "lit";

export const linkStyles = css`
    a {
        color: hsl(var(--foreground));
        text-decoration: none;

        &:hover {
            color: hsl(var(--primary));
        }
    }

`