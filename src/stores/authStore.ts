// src/stores/authStore.js
import { writable } from 'svelte/store';

// Membuat store untuk status autentikasi
export const isAuthenticated = writable(false); // Status login, default false
