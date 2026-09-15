const pptxgen = require('pptxgenjs');
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Gaëtan Perruche';
pptx.subject = 'T1 — Administration et maintenance Windows Server';
pptx.title = 'T1 — Administration et maintenance Windows Server';
pptx.company = 'Cours B3 Systèmes, Réseaux et Cloud';
pptx.lang = 'fr-FR';
pptx.theme = {
  headFontFace: 'Aptos Display',
  bodyFontFace: 'Aptos',
  lang: 'fr-FR'
};
pptx.defineSlideMaster({
  title: 'MASTER',
  background: { color: 'F7F9FC' },
  objects: [
    { rect: { x:0, y:0, w:13.333, h:0.16, fill:{color:'00A7C4'}, line:{color:'00A7C4'} } },
    { text: { text:'T1 • Administration & maintenance Windows Server', options:{x:0.45,y:7.16,w:8.8,h:0.2,fontFace:'Aptos',fontSize:9,color:'5A6573',margin:0} } },
    { text: { text:'B3 SRC • 12 h • 8 × 1 h 30', options:{x:11.2,y:7.16,w:1.65,h:0.2,fontFace:'Aptos',fontSize:9,color:'5A6573',align:'right',margin:0} } }
  ],
  slideNumber: { x: 12.92, y: 7.15, color: '5A6573', fontFace:'Aptos', fontSize:9 }
});

const C = {
  navy: '102A43',
  blue: '1665D8',
  cyan: '00A7C4',
  teal: '0B7285',
  green: '2F855A',
  amber: 'B7791F',
  red: 'C53030',
  ink: '243B53',
  muted: '627D98',
  light: 'EAF2F8',
  white: 'FFFFFF',
  gray: 'F0F4F8',
  darkgray: '486581'
};

function addTitle(slide, title, subtitle='') {
  slide.addText(title, {x:0.55,y:0.42,w:12.1,h:0.55,fontFace:'Aptos Display',fontSize:27,bold:true,color:C.navy,margin:0,breakLine:false});
  if (subtitle) slide.addText(subtitle,{x:0.58,y:1.02,w:11.9,h:0.36,fontSize:12.5,color:C.muted,margin:0});
}
function addTime(slide, text) {
  slide.addShape(pptx.ShapeType.roundRect,{x:11.55,y:0.48,w:1.1,h:0.38,rectRadius:0.08,fill:{color:'E6FFFA'},line:{color:'B2F5EA',width:1}});
  slide.addText(text,{x:11.62,y:0.565,w:0.96,h:0.18,fontSize:10,bold:true,color:C.teal,align:'center',margin:0});
}
function bulletList(slide, items, x=0.75, y=1.55, w=11.8, h=4.9, fontSize=19) {
  const runs=[];
  items.forEach((it,idx)=>{
    runs.push({text:it,options:{bullet:{indent:18},hanging:4,breakLine:true}});
  });
  slide.addText(runs,{x,y,w,h,fontSize,color:C.ink,breakLine:false,paraSpaceAfterPt:12,margin:0.04, valign:'top'});
}
function addCallout(slide, text, color=C.blue, y=5.8) {
  slide.addShape(pptx.ShapeType.roundRect,{x:0.78,y,w:11.7,h:0.72,fill:{color:'FFFFFF'},line:{color,width:1.6},radius:0.08});
  slide.addText(text,{x:1.0,y:y+0.17,w:11.25,h:0.33,fontSize:16.5,bold:true,color,align:'center',margin:0});
}
function addTwoCol(slide,leftTitle,leftItems,rightTitle,rightItems) {
  const x1=0.7,x2=6.75,y=1.55,w=5.6,h=4.9;
  slide.addShape(pptx.ShapeType.roundRect,{x:x1,y,w,h,fill:{color:'FFFFFF'},line:{color:'D9E2EC',width:1},radius:0.06,shadow:{type:'outer',color:'D9E2EC',opacity:0.25,blur:1,angle:45,distance:1}});
  slide.addShape(pptx.ShapeType.roundRect,{x:x2,y,w,h,fill:{color:'FFFFFF'},line:{color:'D9E2EC',width:1},radius:0.06,shadow:{type:'outer',color:'D9E2EC',opacity:0.25,blur:1,angle:45,distance:1}});
  slide.addText(leftTitle,{x:x1+0.25,y:y+0.25,w:w-0.5,h:0.35,fontSize:18,bold:true,color:C.blue,margin:0});
  slide.addText(leftItems.map(t=>({text:t,options:{bullet:{indent:16},breakLine:true}})),{x:x1+0.3,y:y+0.78,w:w-0.6,h:h-1.0,fontSize:16.5,color:C.ink,paraSpaceAfterPt:9,margin:0});
  slide.addText(rightTitle,{x:x2+0.25,y:y+0.25,w:w-0.5,h:0.35,fontSize:18,bold:true,color:C.teal,margin:0});
  slide.addText(rightItems.map(t=>({text:t,options:{bullet:{indent:16},breakLine:true}})),{x:x2+0.3,y:y+0.78,w:w-0.6,h:h-1.0,fontSize:16.5,color:C.ink,paraSpaceAfterPt:9,margin:0});
}
function addFlowArrow(slide,x1,y1,x2,y2,color=C.cyan) {
  slide.addShape(pptx.ShapeType.chevron,{x:x1,y:y1,w:x2-x1,h:y2-y1,fill:{color},line:{color}});
}
function addNode(slide,x,y,w,h,title,sub,color=C.blue) {
  slide.addShape(pptx.ShapeType.roundRect,{x,y,w,h,fill:{color:'FFFFFF'},line:{color,width:2},radius:0.08,shadow:{type:'outer',color:'AAB7C4',opacity:0.2,blur:1,angle:45,distance:1}});
  slide.addText(title,{x:x+0.15,y:y+0.18,w:w-0.3,h:0.34,fontSize:18,bold:true,color,align:'center',margin:0});
  slide.addText(sub,{x:x+0.15,y:y+0.58,w:w-0.3,h:h-0.72,fontSize:12.5,color:C.muted,align:'center',margin:0.02,valign:'mid'});
}

// 1
{
 const s=pptx.addSlide('MASTER');
 s.background={color:C.navy};
 s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:7.5,fill:{color:C.navy},line:{color:C.navy}});
 s.addShape(pptx.ShapeType.rect,{x:0,y:0,w:13.333,h:0.18,fill:{color:C.cyan},line:{color:C.cyan}});
 s.addText('T1', {x:0.75,y:0.92,w:1.1,h:0.55,fontSize:34,bold:true,color:C.cyan,margin:0});
 s.addText('Administration et maintenance\nWindows Server', {x:0.75,y:1.55,w:8.8,h:1.55,fontSize:34,bold:true,color:C.white,margin:0,breakLine:false});
 s.addText('B3 Systèmes, Réseaux & Cloud • 12 h', {x:0.78,y:3.32,w:7.5,h:0.42,fontSize:18,color:'C5D9E8',margin:0});
 s.addText('2 h de concepts + démonstrations\n10 h de TP, maintenance, automatisation et break/fix', {x:0.78,y:4.18,w:6.6,h:0.9,fontSize:20,color:C.white,margin:0,breakLine:false});
 addNode(s,9.2,1.35,3.1,1.15,'AD DS','Identités • domaines • OU',C.cyan);
 addNode(s,9.2,2.85,3.1,1.15,'DNS / DHCP','Nommer • adresser • dépanner',C.blue);
 addNode(s,9.2,4.35,3.1,1.15,'SMB / PowerShell','Droits • automatisation',C.green);
 s.addText('NovaCorp — construire, valider, casser, réparer.',{x:0.78,y:6.35,w:10.8,h:0.44,fontSize:20,bold:true,color:C.cyan,margin:0});
}

// 2
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Objectifs du module','Ce que vous devez savoir faire après les 8 séances'); addTime(s,'5 min');
 bulletList(s,[
  'Déployer un domaine Active Directory cohérent et comprendre ses dépendances.',
  'Structurer OU, utilisateurs et groupes avec une logique exploitable en entreprise.',
  'Sécuriser des partages SMB avec des ACL NTFS et raisonner sur les droits effectifs.',
  'Configurer DHCP/DNS puis intégrer un poste Windows au domaine.',
  'Automatiser un onboarding avec PowerShell et diagnostiquer un incident sans “cliquer au hasard”.'
 ],0.85,1.6,11.7,4.8,18.5);
 addCallout(s,'Fil rouge : NovaCorp — un vrai mini-SI plutôt qu’une suite de fenêtres à ouvrir.',C.cyan,6.0);
}

// 3
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Le lab NovaCorp','Trois VMs, un réseau, une dépendance critique : DNS'); addTime(s,'5 min');
 addNode(s,0.8,2.1,3.0,1.55,'CLT01','Windows 11 Pro\nIP via DHCP',C.green);
 addNode(s,5.15,1.35,3.0,1.55,'DC01','AD DS + DNS\n10.10.10.10',C.blue);
 addNode(s,9.5,2.1,3.0,1.55,'SRV01','DHCP + File Server\n10.10.10.20',C.teal);
 s.addShape(pptx.ShapeType.line,{x:3.8,y:2.88,w:1.35,h:0,line:{color:C.cyan,width:2.5,endArrowType:'triangle'}});
 s.addShape(pptx.ShapeType.line,{x:8.15,y:2.88,w:1.35,h:0,line:{color:C.cyan,width:2.5,endArrowType:'triangle'}});
 s.addShape(pptx.ShapeType.line,{x:3.8,y:3.42,w:5.7,h:0,line:{color:C.teal,width:1.8,endArrowType:'triangle',dash:'dash'}});
 s.addText('novacorp.test',{x:4.65,y:4.35,w:4.0,h:0.5,fontSize:28,bold:true,color:C.navy,align:'center',margin:0});
 s.addText('Réseau : 10.10.10.0/24 • DHCP hyperviseur désactivé',{x:2.3,y:5.1,w:8.7,h:0.4,fontSize:17,color:C.muted,align:'center',margin:0});
 addCallout(s,'Un client peut avoir une “bonne IP” et pourtant ne plus fonctionner dans le domaine si son DNS est mauvais.',C.red,5.85);
}

// 4
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Windows Server : rôles, fonctionnalités, services','Penser en briques plutôt qu’en “serveur magique”'); addTime(s,'5 min');
 addTwoCol(s,'Rôles serveur',[
  'AD Domain Services : identité et annuaire',
  'DNS Server : résolution de noms',
  'DHCP Server : configuration IP dynamique',
  'File Server : SMB et stockage',
  'Hyper-V : virtualisation'
 ],'Outils d’administration',[
  'Server Manager / MMC',
  'Windows Admin Center (selon environnement)',
  'PowerShell / modules RSAT',
  'Event Viewer / journaux',
  'Commandes réseau et diagnostics'
 ]);
}

// 5
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Workgroup vs domaine','Pourquoi Active Directory change le modèle d’administration'); addTime(s,'5 min');
 addTwoCol(s,'Workgroup',[
  'Comptes locaux machine par machine',
  'Politiques locales',
  'Peu adapté à un parc important',
  'Gestion et audit dispersés'
 ],'Domaine Active Directory',[
  'Identités centralisées',
  'Authentification Kerberos / NTLM selon le cas',
  'GPO centralisées',
  'Délégation et administration à l’échelle'
 ]);
 addCallout(s,'Le domaine ne supprime pas la complexité : il la centralise pour la rendre gouvernable.',C.blue,6.05);
}

// 6
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Les briques AD DS','Forêt → domaine → OU → objets'); addTime(s,'7 min');
 const xs=[0.9,3.8,6.7,9.6], labels=[['Forêt','Frontière de sécurité / schéma'],['Domaine','DNS + annuaire + réplication'],['OU','Organisation + délégation + GPO'],['Objets','Users • Groups • Computers']];
 labels.forEach((a,i)=>addNode(s,xs[i],2.1,2.55,1.6,a[0],a[1],[C.blue,C.cyan,C.teal,C.green][i]));
 for(let i=0;i<3;i++) s.addShape(pptx.ShapeType.line,{x:xs[i]+2.55,y:2.9,w:0.35,h:0,line:{color:C.darkgray,width:2,endArrowType:'triangle'}});
 bulletList(s,[
  'Dans ce lab : une forêt = un domaine = novacorp.test.',
  'Les OU servent à organiser et cibler l’administration ; ce ne sont pas des dossiers de fichiers.',
  'Les groupes servent à porter les droits ; les utilisateurs ne devraient pas être ajoutés directement partout.'
 ],1.0,4.45,11.2,1.55,16.5);
}

// 7
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Groupes et AGDLP','Un peu plus “entreprise” qu’un TP de base'); addTime(s,'7 min');
 addNode(s,0.7,2.35,2.2,1.2,'A','Accounts\nAlice',C.green);
 addNode(s,3.35,2.35,2.2,1.2,'G','Global Group\nGG-FINANCE',C.blue);
 addNode(s,6.0,2.35,2.2,1.2,'DL','Domain Local\nDL-FINANCE-RW',C.cyan);
 addNode(s,8.65,2.35,2.2,1.2,'P','Permission\nFinance = Modify',C.amber);
 for (let x of [2.9,5.55,8.2]) s.addShape(pptx.ShapeType.chevron,{x:x,y:2.68,w:0.4,h:0.55,fill:{color:C.darkgray},line:{color:C.darkgray}});
 s.addText('Pourquoi ?', {x:0.9,y:4.25,w:2.0,h:0.35,fontSize:20,bold:true,color:C.navy,margin:0});
 bulletList(s,[
  'On change l’appartenance à un groupe, pas des dizaines d’ACL.',
  'Le rôle métier et le droit sur la ressource sont séparés.',
  'C’est plus simple à auditer, à déléguer et à faire évoluer.'
 ],1.0,4.75,11.0,1.5,16.5);
}

// 8
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'DNS : la dépendance invisible d’Active Directory','Sans résolution correcte, le domaine devient vite “bizarre”'); addTime(s,'7 min');
 addTwoCol(s,'Ce que DNS doit permettre',[
  'Résoudre DC01.novacorp.test',
  'Localiser les services via des enregistrements SRV',
  'Permettre aux clients de trouver un contrôleur de domaine',
  'Fournir une source cohérente à tous les membres du domaine'
 ],'Commandes à maîtriser',[
  'ipconfig /all',
  'Resolve-DnsName',
  'nslookup',
  'Get-DnsServerZone',
  'Test-NetConnection'
 ]);
 addCallout(s,'Premier réflexe sur un poste membre d’un domaine : vérifier QUEL serveur DNS il utilise.',C.red,6.02);
}

// 9
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Installer le premier contrôleur de domaine','De Windows Server “vide” à novacorp.test'); addTime(s,'6 min');
 const steps=[
  ['1','Nom + IP statique','DC01 • 10.10.10.10'],
  ['2','Rôle AD DS','Install-WindowsFeature'],
  ['3','Promotion','Install-ADDSForest'],
  ['4','Redémarrage','DNS + SYSVOL + NTDS'],
  ['5','Validation','Get-ADDomain • dcdiag']
 ];
 steps.forEach((st,i)=>{
  const x=0.6+i*2.52;
  s.addShape(pptx.ShapeType.ellipse,{x:x,y:2.05,w:0.62,h:0.62,fill:{color:i<3?C.blue:C.teal},line:{color:'FFFFFF',width:1}});
  s.addText(st[0],{x:x,y:2.17,w:0.62,h:0.25,fontSize:15,bold:true,color:C.white,align:'center',margin:0});
  s.addText(st[1],{x:x-0.1,y:2.9,w:2.0,h:0.35,fontSize:16,bold:true,color:C.navy,margin:0});
  s.addText(st[2],{x:x-0.1,y:3.38,w:2.15,h:0.65,fontSize:12.5,color:C.muted,margin:0});
  if(i<4) s.addShape(pptx.ShapeType.line,{x:x+0.72,y:2.37,w:1.65,h:0,line:{color:C.cyan,width:2,endArrowType:'triangle'}});
 });
 addCallout(s,'Le rôle AD DS est installé avant la promotion. La promotion transforme le serveur en contrôleur de domaine.',C.blue,5.55);
}

// 10
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'GPO : qui reçoit quoi ?','LSDOU et ciblage'); addTime(s,'7 min');
 s.addText('Local → Site → Domain → OU',{x:1.0,y:1.65,w:11.2,h:0.55,fontSize:28,bold:true,color:C.navy,align:'center',margin:0});
 const items=[['L','Local','Stratégie locale'],['S','Site','Topologie AD'],['D','Domain','Règles communes'],['OU','OU','Ciblage fin']];
 items.forEach((it,i)=>addNode(s,0.9+i*3.05,2.6,2.45,1.35,it[0],it[1]+'\n'+it[2],[C.darkgray,C.teal,C.blue,C.green][i]));
 s.addText('Question : une GPO avec uniquement des paramètres User Configuration doit-elle être liée à l’OU des serveurs ?', {x:1.1,y:4.8,w:11.0,h:0.7,fontSize:19,bold:true,color:C.red,align:'center',margin:0});
 addCallout(s,'Toujours vérifier le scope, le lien, l’objet ciblé et gpresult avant d’accuser “les GPO”.',C.teal,5.85);
}

// 11
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'SMB vs NTFS','Deux couches de permissions, un droit effectif'); addTime(s,'7 min');
 addNode(s,0.9,2.1,3.2,1.45,'Partage SMB','Qui peut entrer par \\SRV01\\Finance ?',C.blue);
 addNode(s,5.05,2.1,3.2,1.45,'ACL NTFS','Que peut-il faire dans D:\\Shares\\Finance ?',C.teal);
 addNode(s,9.2,2.1,3.2,1.45,'Droit effectif','Le chemin d’accès impose la combinaison effective',C.amber);
 s.addShape(pptx.ShapeType.line,{x:4.1,y:2.82,w:0.95,h:0,line:{color:C.cyan,width:2,endArrowType:'triangle'}});
 s.addShape(pptx.ShapeType.line,{x:8.25,y:2.82,w:0.95,h:0,line:{color:C.cyan,width:2,endArrowType:'triangle'}});
 s.addText('Exemple',{x:0.9,y:4.45,w:1.3,h:0.35,fontSize:18,bold:true,color:C.navy,margin:0});
 s.addText('Partage = Change   +   NTFS = Read   →   via SMB : Read',{x:2.2,y:4.38,w:9.2,h:0.45,fontSize:22,bold:true,color:C.red,margin:0});
 addCallout(s,'Ne jamais se contenter de regarder une seule ACL quand un utilisateur reçoit “Access denied”.',C.red,5.65);
}

// 12
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Moindre privilège','Le bon droit, au bon groupe, sur la bonne ressource'); addTime(s,'5 min');
 addTwoCol(s,'À éviter',[
  'Everyone = Full Control partout',
  'Alice ajoutée directement sur 12 dossiers',
  'Droits historiques jamais nettoyés',
  'Partages sans propriétaire métier'
 ],'À viser',[
  'Groupes métiers + groupes de ressources',
  'Read / Modify selon le besoin',
  'Administrateurs distincts des utilisateurs',
  'Tests avec plusieurs profils utilisateurs'
 ]);
}

// 13
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'DHCP : DORA en 30 secondes','Distribuer une configuration, pas seulement une IP'); addTime(s,'6 min');
 const names=[['D','Discover'],['O','Offer'],['R','Request'],['A','Acknowledge']];
 names.forEach((n,i)=>{
   const x=0.85+i*3.05;
   s.addShape(pptx.ShapeType.ellipse,{x,y:2.1,w:1.05,h:1.05,fill:{color:[C.blue,C.cyan,C.teal,C.green][i]},line:{color:'FFFFFF'}});
   s.addText(n[0],{x:x,y:2.35,w:1.05,h:0.35,fontSize:24,bold:true,color:C.white,align:'center',margin:0});
   s.addText(n[1],{x:x-0.35,y:3.42,w:1.75,h:0.38,fontSize:16,bold:true,color:C.navy,align:'center',margin:0});
   if(i<3) s.addShape(pptx.ShapeType.line,{x:x+1.25,y:2.62,w:1.55,h:0,line:{color:C.darkgray,width:2,endArrowType:'triangle'}});
 });
 bulletList(s,[
  'Scope = pool d’adresses + masque.',
  'Options = DNS, suffixe DNS, éventuellement passerelle.',
  'Dans un domaine AD, distribuer le mauvais DNS est une panne fonctionnelle majeure.'
 ],1.0,4.35,11.2,1.45,16.5);
}

// 14
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Les commandes réseau qui sauvent un TP','Voir, résoudre, tester'); addTime(s,'5 min');
 const cmds=[
  ['ipconfig /all','Adresse, masque, DNS, DHCP'],
  ['Resolve-DnsName','Résolution A / SRV / PTR'],
  ['Test-NetConnection','Port TCP et chemin'],
  ['whoami /groups','Identité et groupes'],
  ['gpresult /r','GPO appliquées']
 ];
 cmds.forEach((c,i)=>{
  const y=1.55+i*0.95;
  s.addShape(pptx.ShapeType.roundRect,{x:0.85,y,w:3.2,h:0.62,fill:{color:'E8F1FB'},line:{color:'B8D5F5'}});
  s.addText(c[0],{x:1.03,y:y+0.16,w:2.85,h:0.24,fontFace:'Consolas',fontSize:15,bold:true,color:C.blue,margin:0});
  s.addText(c[1],{x:4.4,y:y+0.13,w:7.5,h:0.3,fontSize:17,color:C.ink,margin:0});
 });
}

// 15
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'PowerShell : administrer, vérifier, automatiser','La GUI pour comprendre ; PowerShell pour répéter et prouver'); addTime(s,'7 min');
 addTwoCol(s,'Administration',[
  'Install-WindowsFeature',
  'New-ADUser / New-ADGroup',
  'New-SmbShare',
  'Add-DhcpServerv4Scope',
  'New-GPO / New-GPLink'
 ],'Validation',[
  'Get-ADDomain',
  'Resolve-DnsName',
  'Get-SmbShareAccess',
  'Get-DhcpServerv4Lease',
  'Get-WinEvent'
 ]);
 addCallout(s,'Une automatisation utile commence par des préconditions, des contrôles d’existence et une validation.',C.green,6.03);
}

// 16
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Idempotence : le niveau au-dessus du simple script','Relancer sans casser ni dupliquer'); addTime(s,'5 min');
 s.addText('Mauvais réflexe',{x:1.0,y:1.55,w:3.0,h:0.4,fontSize:20,bold:true,color:C.red,margin:0});
 s.addText('New-ADUser ...\nNew-ADUser ...\nNew-ADUser ...',{x:1.0,y:2.05,w:4.3,h:1.5,fontFace:'Consolas',fontSize:18,color:C.ink,fill:{color:'FFF5F5'},margin:0.18});
 s.addText('Meilleur réflexe',{x:7.0,y:1.55,w:3.4,h:0.4,fontSize:20,bold:true,color:C.green,margin:0});
 s.addText("if (-not (Get-ADUser ...)) {\n    New-ADUser ...\n}\ntry { ... } catch { ... }",{x:7.0,y:2.05,w:5.0,h:1.5,fontFace:'Consolas',fontSize:17,color:C.ink,fill:{color:'F0FFF4'},margin:0.18});
 bulletList(s,[
  'TP5 : importer un CSV, créer uniquement ce qui manque, puis relancer le script.',
  'Bonus : rapport CSV et support de -WhatIf.'
 ],1.0,4.45,11.2,1.45,17);
}

// 17
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Hyper-V : l’essentiel à connaître','Le TP complet est bonus car la virtualisation imbriquée dépend du poste hôte'); addTime(s,'5 min');
 addNode(s,0.8,2.0,2.4,1.4,'Host','Windows Server + rôle Hyper-V',C.blue);
 addNode(s,4.0,1.55,2.4,1.2,'vSwitch','External / Internal / Private',C.cyan);
 addNode(s,7.2,1.15,2.2,1.05,'VM01','vCPU • RAM • NIC',C.green);
 addNode(s,7.2,2.75,2.2,1.05,'VM02','Generation 2',C.green);
 addNode(s,10.2,1.95,2.2,1.25,'VHDX','Disque virtuel',C.teal);
 s.addShape(pptx.ShapeType.line,{x:3.2,y:2.45,w:0.8,h:0,line:{color:C.darkgray,width:2,endArrowType:'triangle'}});
 s.addShape(pptx.ShapeType.line,{x:6.4,y:2.0,w:0.8,h:0,line:{color:C.darkgray,width:2,endArrowType:'triangle'}});
 s.addShape(pptx.ShapeType.line,{x:6.4,y:2.15,w:0.8,h:1.1,line:{color:C.darkgray,width:2,endArrowType:'triangle'}});
 s.addShape(pptx.ShapeType.line,{x:9.4,y:2.2,w:0.8,h:0.28,line:{color:C.darkgray,width:2,endArrowType:'triangle'}});
 addCallout(s,'À retenir aujourd’hui : rôle Hyper-V, vSwitch, VM, VHDX, génération et isolation réseau.',C.blue,5.45);
}

// 18
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'WSUS / WDS : connaître sans s’y enfermer','Le programme les cite ; l’écosystème Microsoft a évolué'); addTime(s,'5 min');
 addTwoCol(s,'WSUS',[
  'Déploiement centralisé de mises à jour Microsoft',
  'Toujours disponible sur Windows Server 2025',
  'Déclaré déprécié : plus de nouvelles fonctionnalités',
  'À connaître pour les environnements existants'
 ],'WDS',[
  'Déploiement réseau / PXE historique',
  'Toujours rencontré dans les SI',
  'Plusieurs workflows boot.wim sont dépréciés',
  'À positionner dans une stratégie de déploiement moderne'
 ]);
 addCallout(s,'Sur 12 h, WSUS/WDS restent positionnés ; le temps gagné sert à pratiquer maintenance, Hyper-V, automatisation et diagnostic.',C.amber,6.03);
}

// 19
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Maintenance : ce qui fait tenir un serveur dans le temps','Installer n’est que le début'); addTime(s,'5 min');
 const cards=[
  ['Mises à jour','Cycle contrôlé • fenêtres • rollback',C.blue],
  ['Sauvegarde','État système • données • restauration testée',C.green],
  ['Logs','Event Viewer • centralisation • alertes',C.teal],
  ['Comptes admin','Moindre privilège • comptes séparés',C.amber],
  ['Capacité','CPU • RAM • disque • croissance',C.cyan],
  ['Documentation','Architecture • procédures • changements',C.darkgray]
 ];
 cards.forEach((c,i)=>{
  const col=i%3,row=Math.floor(i/3); const x=0.8+col*4.1,y=1.65+row*2.05;
  s.addShape(pptx.ShapeType.roundRect,{x,y,w:3.65,h:1.45,fill:{color:'FFFFFF'},line:{color:c[2],width:1.5},radius:0.06});
  s.addText(c[0],{x:x+0.2,y:y+0.2,w:3.25,h:0.3,fontSize:18,bold:true,color:c[2],margin:0});
  s.addText(c[1],{x:x+0.2,y:y+0.68,w:3.25,h:0.52,fontSize:13.5,color:C.ink,margin:0});
 });
}

// 20
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Diagnostic : une méthode avant les outils','IP → DNS → service → authentification → autorisation'); addTime(s,'8 min');
 const labels=[['1','IP','ipconfig /all'],['2','DNS','Resolve-DnsName'],['3','Service','Test-NetConnection'],['4','Auth','whoami • klist'],['5','Droits','groups • ACL']];
 labels.forEach((l,i)=>{
  const x=0.55+i*2.55;
  s.addShape(pptx.ShapeType.roundRect,{x,y:2.0,w:2.05,h:1.55,fill:{color:i%2?'F0FDFA':'EEF6FF'},line:{color:i%2?C.teal:C.blue,width:1.6},radius:0.06});
  s.addText(l[0],{x:x+0.12,y:2.12,w:0.45,h:0.35,fontSize:22,bold:true,color:i%2?C.teal:C.blue,margin:0});
  s.addText(l[1],{x:x+0.62,y:2.15,w:1.2,h:0.3,fontSize:18,bold:true,color:C.navy,margin:0});
  s.addText(l[2],{x:x+0.15,y:2.85,w:1.75,h:0.4,fontFace:'Consolas',fontSize:11.5,color:C.muted,align:'center',margin:0});
  if(i<4) s.addShape(pptx.ShapeType.chevron,{x:x+2.08,y:2.48,w:0.4,h:0.55,fill:{color:C.darkgray},line:{color:C.darkgray}});
 });
 s.addText('Avant chaque correction : formuler une hypothèse et choisir un test qui peut la confirmer ou la réfuter.',{x:1.0,y:4.6,w:11.1,h:0.75,fontSize:20,bold:true,color:C.red,align:'center',margin:0});
 addCallout(s,'Le challenge final récompense la preuve de la cause racine, pas la chance.',C.red,5.8);
}

// 21
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Le planning des 8 séances','12 h : 2 h de cours + 10 h de pratique'); addTime(s,'4 min');
 const rows=[
  ['S1','Cours','Slides 1–16','Fondamentaux + PowerShell'],
  ['S2','Cours + TP1','Slides 17–24 + AD DS','Domaine + DNS validés'],
  ['S3','TP2','AD + AGDLP + GPO','Structure + 2 GPO'],
  ['S4','TP3','SMB + NTFS','Droits métier + ABE'],
  ['S5','TP4','DHCP + DNS','Bail + direct/inverse'],
  ['S6','TP5','PowerShell','Onboarding idempotent'],
  ['S7','TP6','Maintenance + Hyper-V','Health-check + mini-lab'],
  ['S8','TP7','Break/Fix','Cause racine + prévention']
 ];
 rows.forEach((r,i)=>{
  const y=1.30+i*0.66;
  s.addText(r[0],{x:0.65,y:y+0.10,w:0.55,h:0.22,fontSize:15,bold:true,color:C.blue,margin:0});
  s.addShape(pptx.ShapeType.roundRect,{x:1.28,y,w:1.45,h:0.48,fill:{color:i===7?'FFF5F5':'EAF2F8'},line:{color:i===7?C.red:C.cyan}});
  s.addText(r[1],{x:1.32,y:y+0.10,w:1.37,h:0.20,fontSize:12.5,bold:true,color:i===7?C.red:C.teal,align:'center',margin:0});
  s.addText(r[2],{x:3.0,y:y+0.08,w:4.25,h:0.24,fontSize:15.5,bold:true,color:C.navy,margin:0});
  s.addText(r[3],{x:7.55,y:y+0.08,w:4.8,h:0.24,fontSize:14.5,color:C.muted,margin:0});
 });
}

// 22
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Règles du jeu pour les TP','Le résultat compte, mais la preuve aussi'); addTime(s,'4 min');
 bulletList(s,[
  'Ne pas copier une correction avant d’avoir essayé et formulé une hypothèse.',
  'Chaque TP se termine par des commandes de validation à conserver dans le rendu.',
  'Les droits sont attribués à des groupes, pas directement aux utilisateurs.',
  'Les scripts doivent contenir des contrôles et rester lisibles.',
  'En cas de panne : ne pas redémarrer / réinstaller comme premier réflexe.'
 ],0.95,1.65,11.3,4.5,18);
 addCallout(s,'Un administrateur professionnel sait expliquer pourquoi ça marche — et pourquoi ça ne marche pas.',C.green,5.95);
}

// 23
{
 const s=pptx.addSlide('MASTER'); addTitle(s,'Mini-check avant de commencer TP1','Vous devez pouvoir répondre sans chercher'); addTime(s,'3 min');
 const qs=[
  'Pourquoi DC01 doit-il avoir une IP statique ?',
  'Quel DNS doit utiliser DC01 dans ce lab ?',
  'Quel est le nom DNS du domaine ?',
  'Quel test permettra de vérifier la présence des SRV AD ?',
  'Quelle différence entre installer le rôle AD DS et promouvoir le serveur ?'
 ];
 qs.forEach((q,i)=>{
  s.addShape(pptx.ShapeType.ellipse,{x:0.95,y:1.55+i*0.9,w:0.5,h:0.5,fill:{color:C.cyan},line:{color:C.cyan}});
  s.addText(String(i+1),{x:0.95,y:1.67+i*0.9,w:0.5,h:0.2,fontSize:13,bold:true,color:C.white,align:'center',margin:0});
  s.addText(q,{x:1.7,y:1.58+i*0.9,w:10.5,h:0.42,fontSize:18,color:C.ink,margin:0});
 });
}

// 24
{
 const s=pptx.addSlide('MASTER');
 s.addText('À vous de jouer.',{x:1.0,y:1.25,w:11.3,h:0.8,fontSize:42,bold:true,color:C.navy,align:'center',margin:0});
 s.addText('TP1 — Construire novacorp.test',{x:1.0,y:2.35,w:11.3,h:0.55,fontSize:26,bold:true,color:C.blue,align:'center',margin:0});
 addNode(s,2.0,3.4,2.55,1.3,'1','IP statique\n10.10.10.10',C.blue);
 addNode(s,5.4,3.4,2.55,1.3,'2','AD DS + DNS\nPromotion',C.cyan);
 addNode(s,8.8,3.4,2.55,1.3,'3','Validation\nSRV + dcdiag',C.green);
 s.addShape(pptx.ShapeType.line,{x:4.55,y:4.05,w:0.85,h:0,line:{color:C.darkgray,width:2,endArrowType:'triangle'}});
 s.addShape(pptx.ShapeType.line,{x:7.95,y:4.05,w:0.85,h:0,line:{color:C.darkgray,width:2,endArrowType:'triangle'}});
 s.addText('Objectif : un domaine que vous êtes capables de prouver fonctionnel.',{x:1.0,y:5.55,w:11.3,h:0.6,fontSize:21,bold:true,color:C.teal,align:'center',margin:0});
}

pptx.writeFile({ fileName: __dirname + '/T1-Windows-Server-Administration.pptx' });
