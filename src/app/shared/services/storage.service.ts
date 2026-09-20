import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }
    setLocalItem<T>(key: string, value: T): void {
        const jsonValue = JSON.stringify(value)
        try {
            localStorage.setItem(key, jsonValue)
        }
        catch (error: any) {
            if (error?.name !== "QuotaExceededError") {
                console.log("Could not write item to localStorage")
                console.log(`Unexpected error ${error.name}: ${error.message}`)
                return
            }
            // Out of room: drop everything and retry once, since clearing on its own
            // would still leave this write unsaved.
            localStorage.clear()
            try {
                localStorage.setItem(key, jsonValue)
            }
            catch {
                console.log(`QuotaExceededError: ${key} does not fit in localStorage even when empty. Ask client to increase limit`)
            }
        }
    }

    getLocalItem<T>(key: string): T | null {
        const value = localStorage.getItem(key)
        return value ? JSON.parse(value) : null
    }

    removeLocalItem(key: string): void {
        localStorage.removeItem(key)
    }

    clearLocalStorage(): void {
        localStorage.clear()
    }

    setSessionItem<T>(key: string, value: T): void {
        const jsonValue = JSON.stringify(value)
        try {
            sessionStorage.setItem(key, jsonValue)
        }
        catch (error: any) {
            if (error?.name !== "QuotaExceededError") {
                console.log("Could not write item to sessionStorage")
                console.log(`Unexpected error ${error.name}: ${error.message}`)
                return
            }
            // Out of room: drop everything and retry once, since clearing on its own
            // would still leave this write unsaved.
            sessionStorage.clear()
            try {
                sessionStorage.setItem(key, jsonValue)
            }
            catch {
                console.log(`QuotaExceededError: ${key} does not fit in sessionStorage even when empty. Ask client to increase limit`)
            }
        }
    }

    getSessionItem<T>(key: string): T | null {
        const value = sessionStorage.getItem(key)
        return value ? JSON.parse(value) : null
    }

    removeSessionItem(key: string): void {
        sessionStorage.removeItem(key)
    }

    clearSessionStorage(): void {
        sessionStorage.clear()
    }

}

