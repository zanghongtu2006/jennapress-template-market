---
slug: release-notes-v1-1-0
title: "Διόρθωση σφάλματος γλώσσας στο λογότυπο"
summary: Η έκδοση 1.1.0 διορθώνει ένα σφάλμα όπου το κλίκ στο λογότυπο επέστρεφε τη γλώσσα.
publishedAt: "2026-04-01"
category: Project
tags:
  - jenna-press
  - release-notes
  - bug-fix
author:
  name: Jenna Press
seo:
  title: "Release Notes v1.1.0: Διόρθωση σφάλματος γλώσσας στο λογότυπο | Jenna Press"
  description: Η έκδοση 1.1.0 διορθώνει ένα σφάλμα όπου το κλίκ στο λογότυπο επέστρεφε τη γλώσσα.
  canonical: https://example.com/blog/project/release-notes-v1-1-0
bodyTitle: Η γλώσσα σου πρέπει να μένει, όχι να επαναφέρεται
bodyBlocks:
  - type: cta-banner
    title: "Δες τη διόρθωση στο GitHub"
    description: "Η διόρθωση γλώσσας του λογοτύπου είναι live."
    action:
      label: "See the Commit"
      to: https://github.com/zanghongtu2006/JennaPress/commit/604f59f
---
Κάθε πολυγλωσσικό σύστημα έχει ένα αναλλοίωτο που πρέπει να προστατεύεται.

Η έκδοση 1.1.0 διορθώνει ένα σφάλμα που παραβίαζε αυτό το αναλλοίωτο.

Το πρόβλημα

Όταν ένας χρήστης άλλαζε στην γερμανική, ισπανική, κινεζική ή ελληνική, το λογότυπο στην κεφαλίδα συμπεριφερόταν εσφαλμένα.

Η λύση

Ο σύνδεσμος του λογοτύπου διαβάζει τώρα την αποθηκευμένη γλώσσα του χρήστη απευθείας από το localStorage. Χωρίς ανακατεύθυνση, χωρίς τρεμόπαιγμα.

Αυτό ισχύει και για τα δύο templates: `corporate-basic` και `saas-landing`.
