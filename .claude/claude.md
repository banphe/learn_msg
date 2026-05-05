UWAGA! BARDZO WAŻNE.
NIENAWIDZE pisania kodu w taki sposob że nawiasy domykające są ponizej linijki w której sa nawiasy otwierające. WIem że czasem sie nie da inaczej ale rób wszystko aby tego unikać. 

NIENAWIDZE też długich linijek kodu - znacznie bardziej wole więcej linijek ale bardzo krtókich a nizeli jedna długa nieczytelna linijka. 


Znalazłem sobie na you tube kurs masazu tajskiego w którym zaprezentowana jest kompletna sekwencja składająca się z 98 technik na bazie której można wykonać 1.5-2 godzinną, kompletną sesję. Kurs składa się z 8 części gdzie kazda cześć to oddzielne wideo.

Aplikacja nad którą razem pracujemy bazuje właśnie na powyższym kursie i ma na celu w znaczym stopniu usprawnić mi naukę wykonywania tych technik jak również budowanie i zapamiętywanie z nich nowych sekwencji. 

Moją strategią nauki jest praktyczne wykonywanie "okrojonych" sesji składających się ze znacznie mniejszej ilości technik/krokow aby nie przytłaczać się jednorazowo zbyt dużą dawką wiedzy. Z biegiem czasu dodaję więcej technik do czasu aż opanuję wszystko perfekcyjnie.

Z aplikacji korzystam tylko ja, na 14 calowym lap topie i zawsze lokalnie odpalając ją bezpośrednio z VSC poprzez serwer znajdujący się w pliku server.js. Claude Code (czyli Ty) jesteś zainstalowany na tym samym VSC. KOntaktuję sie z tobą poprzez interfejs czatu który jest rozszerzeniem Claude code CLI. 

Aplikację projektuję z myślą nauki w dwóch odrebnych przypadkach:
1. Podczas wykonywnia praktycznej sesji na bliskich znajomych.
W powyższym trybie wykonuje zaplanowaną wcześniej sekwencje z pomocą lap topa na którym otwarta jest nasza aplikacja. Stoi on gdzieś blisko w zasięgu mojego wzroku (około 1-1.5m). Na ekranie widzę po kolei numery technik sekwencji po lewej stronie a po prawej zapętlony film aktualnie wybranej techniki. Przełączanie pomiędzy technikami odbywa sie głosowo - wykorzystujemy do tego chrome Speech API. W aplikacji tryb ten odnosi sie do widoku siatki która pokazuje jedynie numery technik na kafelkach których wielkość można regulowac sliderem w celu dopasowania odpowiedniej wielkosci do wzroku - wykonując masaż czesto poprostu spoglądam na ułozenie numerów. Jeżeli potrzebuje przypomniec sobie na czym polega dana technika to wypowiadam jej numer aby zaczac ja automatycznie odtwarzac. Często też odtwarzam jedna po drugiej na bierzaco. Wtedy korzystam z polecenia głosowego "następna" lub "dalej" aby wywołać przejście do następnej bez dotykania klawiatury. Generalnie w tym trybie aplikacja musi oferować kontrolę tej części interfejsu bez dotyku klawiatury i dodatkowo musi umóżliwiać przeczytanie zawartości na ekranie z dalszej odległości.

2. Poza wykonywaniem sesji. 
Ten tryb odnosi się do sekcji listy reprezentownej w naszej aplikacji w pliku list.js.
W trybie tym tak samo jak w trybie 1 musze mieć możliwość przełączania pomiędzy technikami ale tu nie musi to już być w formacie do czytania z daleka. DOdatkowo tryb ten musi oferować cały wachlarz funkcjonalności przez któe mogę tworzyć, kopiowac, modyfikować, prrzełączać sekwencje zapisane w plikach znajdujacych się w folderze "src\sequences". Część z tych sekwencji będzie póżniej wykorzystywana w trybie 1 a część robię do nauki poza praktycznym treningiem. Tutaj muszę też miec możliwości edycji nazw i parametrów technik. Tryb ten wymaga więcej projektowania i pracy aby zapewnić efektywne użytkowanie. 
W chwili obecnej mamy dodane grupy/oznaczenia technik które nie wiem jeszcze do końca w jaki sposób chce wykorzystywac. Aktualnie grupa czyli kolor odpowiada za pozycje w jakiej znajduje się klient (leży na plecach, boku, brzuchu lub siedzi). Kolory te wizualizowane są pózniej na kafelkach w trybie 1. Oznaczenie z emoji nie jest jeszcze reprezentowane w trybie 1 i nie wiem czy chce aby było. Możliwe że jest mi ono potrzebne jedynie w tym trybie w celu nauki poprzez organzacje/grupowanie technik - to bardzo pomaga pamieciowo w moim przypadku.
Tutaj musimy też mieć możliwosc. Wiele funkcjonalnosci opisanych powyżej jeszcze nie istnieje - są jedynie wizją. 





 




