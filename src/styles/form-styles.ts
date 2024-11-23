import {css} from "lit";

export const formStyles = css`
    form {
        display: block;

        .form-field {
            margin-bottom: 1rem;

            label {
                display: block;
                margin-bottom: 0.3rem;
                width: 100%;
            }

            input, select {
                display: block;
                width: 100%;
            }
        }
    }
`