# Références techniques

Références Microsoft à consulter pour maintenir le cours :

- AD DS — vue d'ensemble : https://learn.microsoft.com/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview
- AD DS — installation : https://learn.microsoft.com/windows-server/identity/ad-ds/deploy/install-active-directory-domain-services--level-100-
- Niveaux fonctionnels AD : https://learn.microsoft.com/windows-server/identity/ad-ds/active-directory-functional-levels
- DNS Server : https://learn.microsoft.com/windows-server/networking/dns/quickstart-install-configure-dns-server
- DHCP Server : https://learn.microsoft.com/windows-server/networking/technologies/dhcp/quickstart-install-configure-dhcp-server
- Groupes de sécurité AD : https://learn.microsoft.com/windows-server/identity/ad-ds/manage/understand-security-groups
- SMB PowerShell : https://learn.microsoft.com/powershell/module/smbshare/new-smbshare
- Hyper-V : https://learn.microsoft.com/windows-server/virtualization/hyper-v/get-started/install-hyper-v
- Group Policy PowerShell : https://learn.microsoft.com/powershell/module/grouppolicy/
- Fonctionnalités supprimées / non développées : https://learn.microsoft.com/windows-server/get-started/removed-deprecated-features-windows-server
- WSUS : https://learn.microsoft.com/windows-server/administration/windows-server-update-services/get-started/windows-server-update-services-wsus
- WDS / boot.wim : https://learn.microsoft.com/windows/deployment/wds-boot-support

## Note 2026

- **WSUS** reste disponible/supporté pour des déploiements existants mais Microsoft le classe comme déprécié et n'y ajoute plus de nouvelles fonctionnalités.
- **WDS** est partiellement déprécié pour plusieurs workflows de déploiement Windows modernes ; l'utilisation de `boot.wim` d'un média d'installation avec WDS sur Windows Server 2025 n'est pas prise en charge.

Le module les replace dans le paysage actuel sans leur consacrer l'essentiel des 12 h.
