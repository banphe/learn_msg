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

src\techniques.json 
Z tego pliku wystarczy przeczytac pierwsze 30 linijek aby zrozumieć strukture. To jest baza danych.

  NIe pokazuj mi ani drzewa ani zawartości plików. Szkoda jest żebys zabierał miejsce w oknie kontekstowym jeżeli ja i tak to wszystko widze w explorerze/edytorze.

  Potwierdz jedynie ze wczytałeś. Chcę poprostu abyś miał te dane do wykorzystywania przy dalszej pracy. 