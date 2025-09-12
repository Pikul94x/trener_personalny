# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Przegląd projektu

To jest strona internetowa trenera personalnego Jakuba Pikula, zbudowana w czystym HTML, CSS i JavaScript. Strona jest aplikacją jednostronicową z nowoczesnym, luksusowym designem ze złotymi akcentami na ciemnym tle.

## Architektura

Kod składa się z trzech głównych plików:
- `index.html`: Zawiera całą strukturę strony i sekcje treści (hero, statystyki, usługi, opinie, doświadczenie, kontakt)
- `style.css`: Implementuje luksusowy złoty design z efektami glass morphism, animacjami i responsywnymi układami
- `script.js`: Obsługuje interakcje włączając animacje przewijania, animacje liczników, efekty hover (tylko desktop) i ekran ładowania

## Kluczowe funkcje

### System designu
- Paleta kolorów: Złote gradienty (`#ffd700`, `#ffb000`, `#cc9900`) na ciemnych tłach
- Efekty szklanych kart z rozmyciem tła
- Responsywne układy siatki
- Niestandardowe animacje (shimmer, pulse, glow)
- Interakcje zoptymalizowane pod dotyk (efekty hover wyłączone na urządzeniach mobilnych)

### Sekcje
1. **Hero**: Sekcja powitalna z animowanym tytułem i przyciskami CTA
2. **Statystyki**: Animowane liczniki metryki klientów
3. **Usługi**: Sześć kart usług z ikonami i listami funkcji
4. **Opinie**: Recenzje klientów w szklanych kartach
5. **Doświadczenie**: Osobista wiadomość i wezwanie do działania
6. **Kontakt**: Trzy metody kontaktu (Instagram, email, telefon)

## Uwagi deweloperskie

### Funkcjonalność JavaScript
- Wykrywanie dotyku: Używa `hasHoverCapability()` do wyłączania efektów hover na urządzeniach mobilnych
- Intersection Observer: Uruchamia animacje gdy sekcje pojawiają się w widoku
- Animacja liczników: Płynne zwiększanie liczb dla statystyk
- Efekty cząsteczek: Unoszące się cząsteczki tylko na desktopie
- Płynne przewijanie: Wewnętrzne linki kotwicowe

### Techniki CSS
- Niestandardowe właściwości CSS dla spójnego motywu
- Clamp() dla responsywnego rozmiaru czcionki
- Grid z auto-fit dla responsywnych układów
- Backdrop-filter dla glass morphism
- Animacje CSS z @keyframes

### Optymalizacja mobilna
- Efekty hover całkowicie wyłączone na urządzeniach dotykowych
- Responsywne punkty przerwania przy 768px i 480px
- Przyjazne dla dotyku cele dotknięcia
- Uproszczone animacje na urządzeniach mobilnych

## Typowe zadania

Aby zmodyfikować treść:
- Edytuj tekst bezpośrednio w `index.html`
- Aktualizuj kolory we właściwościach CSS (sekcja `:root` w `style.css`)
- Dostosuj animacje w `script.js` (logika wykrywania desktop/mobile)

Aby przetestować responsywność:
- Sprawdź punkty przerwania przy 1025px (desktop), 768px (tablet), 480px (mobile)
- Zweryfikuj czy interakcje dotykowe działają poprawnie
- Upewnij się, że efekty hover są wyłączone na urządzeniach mobilnych