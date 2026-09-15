# QCM — Administration Windows Server

**12 questions — 12 points**

1. Quel service est indispensable à Active Directory pour localiser les contrôleurs de domaine ?  
   A. FTP — B. DNS — C. SNMP — D. SMTP

2. Une OU sert principalement à :  
   A. remplacer un domaine — B. organiser les objets et cibler l'administration/GPO — C. fournir DHCP — D. stocker des fichiers

3. Dans AGDLP, un utilisateur est normalement placé directement dans :  
   A. une ACL — B. un groupe global — C. un groupe local machine — D. une zone DNS

4. Un utilisateur possède `Change` sur le partage et `Read` en NTFS. Via SMB, le résultat pratique est :  
   A. Full Control — B. Change — C. Read — D. Administrateur

5. Quelle option DHCP est critique pour un poste membre d'un domaine AD ?  
   A. DNS capable de résoudre le domaine AD — B. FTP — C. SMTP — D. proxy

6. Que décrit DORA ?  
   A. traitement GPO — B. Discover/Offer/Request/Acknowledge — C. réplication AD — D. négociation SMB

7. Quel outil prouve les stratégies appliquées ?  
   A. `gpresult` — B. `format` — C. `diskpart` — D. `arp`

8. Quel cmdlet crée un partage SMB ?  
   A. `New-ADShare` — B. `New-SmbShare` — C. `Add-NtfsShare` — D. `Enable-Share`

9. Pourquoi rendre un script d'administration idempotent/relançable ?  
   A. éviter doublons et erreurs lors des exécutions répétées — B. supprimer les logs — C. éviter les contrôles — D. uniquement réduire sa taille

10. Quel type de vSwitch Hyper-V permet uniquement la communication entre VMs connectées à ce switch ?  
    A. External — B. Internal — C. Private — D. Public

11. Pour un problème d'accès à un partage de domaine, quel ordre est le plus cohérent ?  
    A. ACL -> DNS -> IP — B. IP -> DNS -> service -> authentification -> autorisation — C. reboot -> réinstallation — D. désactiver le firewall

12. Un bon health-check doit :  
    A. uniquement afficher le hostname — B. vérifier des indicateurs, produire une preuve et signaler les anomalies — C. redémarrer tous les services — D. supprimer les événements Warning
