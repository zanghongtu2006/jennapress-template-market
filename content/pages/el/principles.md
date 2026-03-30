---
slug: /principles
title: Αρχές
summary: Οι αρχές σχεδιασμού πίσω από το Jenna Press
bodyTitle: Κανόνες έργου που προστατεύουν το πλαίσιο
seo:
  title: Αρχές | Jenna Press
  description: Διαβάστε τους βασικούς κανόνες που ορίζουν το Jenna Press ως static-first πολυγλωσσικό πλαίσιο.
  canonical: https://www.jennapress.com/principles
blocks:
  - type: feature-grid
    title: Βασικές αρχές
    items:
      - title: Static-only από προεπιλογή
        description: Το Jenna Press δεν βασίζεται σε runtime APIs ή σε ενσωματωμένο server για να αποδώσει το βασικό περιεχόμενο των σελίδων.
      - title: Τα themes είναι ισότιμοι πολίτες
        description: Κανένα template δεν πρέπει να κωδικοποιεί κρυφή σειρά προτεραιότητας ανάμεσα στα dark, light και pink. Η λογική των themes ανήκει στους κοινόχρηστους κανόνες του πλαισίου.
      - title: Το περιεχόμενο είναι η πηγή αλήθειας
        description: Οι συντάκτες πρέπει να τροποποιούν τα markdown source files. Τα generated files μπορεί να υπάρχουν, αλλά είναι outputs και όχι χειρόγραφη αλήθεια.
  - type: feature-grid
    title: Κανόνες συνεργασίας
    items:
      - title: Ελάχιστη τροποποίηση κώδικα
        description: Οι αλλαγές κώδικα πρέπει να μένουν στενές, ανιχνεύσιμες και φιλικές για review αντί να αναμειγνύουν διορθώσεις με ευκαιριακά refactors.
      - title: Τα templates πρέπει να παραμένουν απομονωμένα
        description: Οι αλλαγές templates ανήκουν στους template φακέλους. Οι αλλαγές πλαισίου δεν πρέπει να διολισθαίνουν εύκολα σε αποφάσεις περιεχομένου.
      - title: Το routing και η persistence πρέπει να παραμένουν προβλέψιμα
        description: Η διατήρηση γλώσσας και theme πρέπει να είναι σταθερή σε refresh, εσωτερική πλοήγηση και στατική ανάπτυξη.
---
Αυτές οι αρχές υπάρχουν για να αποτρέψουν ένα κοινό failure mode: ένα έργο που ξεκινά απλό και μετά χάνει σταδιακά τα όριά του.

Στο Jenna Press, ένα generated file επιτρέπεται, αλλά πρέπει να αντιμετωπίζεται ως generated. Ένα template επιτρέπεται, αλλά δεν πρέπει να επαναορίζει σιωπηλά το πλαίσιο. Ένα content file είναι επεξεργάσιμο, αλλά δεν πρέπει να γίνεται χώρος για κρυφή application logic.

Το πλαίσιο παραμένει χρήσιμο μόνο αν αυτές οι γραμμές μένουν ορατές.
