import {afterEach, beforeEach, describe, expect, it} from "vitest";
import {AppState} from "./app-state.ts";

describe('App State', () => {
    let store!: AppState;

    beforeEach(() => {
        store = new AppState({lang: 'en', theme: 'light'});
    })

    it('should have instantiated and have initial state', () => {
        expect(store).toBeTruthy();

        expect(store.lang.value).toBe('en');
        expect(store.theme.value).toBe('light');
    });

    it('should set lang correctly', () => {
        store.setLang('tr');

        expect(store.lang.value).toBe('tr');
        expect(document.documentElement.lang).toBe('tr')
    });
    it('should set theme correctly', () => {
        store.setTheme('dark');
        expect(store.theme.value).toBe('dark');
        expect(document.documentElement.className).contains('dark');
    });
})