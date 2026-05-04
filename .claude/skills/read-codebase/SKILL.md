---
name: read-codebase
description: Wczytaj strukturę projektu i zawartość plików do kontekstu roboczego
user-invocable: true
disable-model-invocation: true
---


1. WYkonaj tree /f aby otrzymać drzewo projektu otwartego w aktywnym workspace VS Code. 
2. Użyj narzedzia read aby przeczytać kompletną zawartość każdego pliku za wyjątkiem tych folderów:
  - .claude - Tutaj znajduje się instrukcje które i tak są ci pokazywane w oknie kontekstowym.
  - .vscode - Tutaj znajdują sie ustawienia VSC - nie ma co tym zasmiecać kontekstu. 

src\techniques.js 
Pomin też ten plik. W nim znajduje się jedynie obiekt "export const TECHNIQUES = {}" zawierający 98 obiektów które sa techikami masażu wraz z info potrzebnym do odczytu ich poprzez YouTube.
To jest nasza baza danych. Nie wczytuj tego bo jest to dużo danych których nie musisz rozumieć a zabrałyby miejsce w oknie kontekstowym.
Wystarczy że pokaże ci pierwsze dwie linijki abyś zroumiał strukturę. Oto one:  
  1:  { id:1,  label:'1',   name:'‖ Dorsal Stretch',                              videoId:'l7M3_hCy13k', start:33,   end:39   },
  2:  { id:2,  label:'2+3', name:'‖ Warming Up Feet & Legs; Patella Circles',     videoId:'l7M3_hCy13k', start:39,   end:147  },

  NIe pokazuj mi ani drzewa ani zawartości plików. Szkoda jest żebys zabierał miejsce w oknie kontekstowym jeżeli ja i tak to wszystko widze w explorerze/edytorze.

  Potwierdz jedynie ze wczytałeś. Chcę poprostu abyś miał te dane do wykorzystywania przy dalszej pracy. 