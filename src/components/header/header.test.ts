import {html, render} from "lit";
import {$, expect} from '@wdio/globals'

import './header.ts'

describe('header component', () => {

    beforeEach(() => {
        render(
            html`
                <app-header></app-header>`,
            document.body
        )
    })


    it('should render brand name correctly', async () => {

        const header = await $('app-header').$('.brand')
        await expect(header).toHaveText('Employee List App')
    })


    afterEach(() => {
        document.body.remove();
    })
})