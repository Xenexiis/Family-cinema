# Passation : refonte Figma Org-Expo / AMMY / Billetterie

> **À copier-coller dans une nouvelle conversation Claude Code** (il faut le serveur MCP Figma connecté).
> Dernière mise à jour : 24/09/2026.

---

## Contexte (à lire par Claude)

Tu reprends le travail d'une session précédente. L'utilisateur s'appelle **Martin**. Il travaille en français et préfère que tu lui poses les questions sous forme de **choix cliquables** (outil AskUserQuestion). Il n'y a **pas de code** à écrire : tout se passe dans **Figma**, via le MCP Figma (`use_figma`, `get_screenshot`, `upload_assets`…). Charge le skill **figma-use** avant tout appel à `use_figma`.

**Demande d'origine.** Martin a donné ses maquettes Figma « Org expo », qui étaient amateur et en désordre. Il a demandé un audit UX/UI, un rangement, des maquettes refaites et une componentisation professionnelle (atomes, molécules, organismes).

**Demande actuelle.** Séparer les 3 projets en **3 fichiers Figma distincts**. Chaque fichier contient les pages Couverture, Maquettes, Composants et Fondations. Les écrans doivent être bien alignés, sans chevauchement ni débordement ; les sections ne sont pas obligatoires. L'audit va dans un **4e fichier Figma**, à part.

## Les fichiers

| Fichier | Clé Figma | Lien | État |
|---|---|---|---|
| Source d'origine (ne pas casser) | `JSwsswVsC3TDbZIg5JlMpd` | https://www.figma.com/design/JSwsswVsC3TDbZIg5JlMpd | Les originaux sont intacts, et les pages « refonte » existent |
| **AMMY** | `XkvAhKyvNmhvao8blomEwe` | https://www.figma.com/design/XkvAhKyvNmhvao8blomEwe | ✅ TERMINÉ |
| **Org-Expo** | `FOXmqau6hlGnSw8BMhTBGs` | https://www.figma.com/design/FOXmqau6hlGnSw8BMhTBGs | ✅ TERMINÉ |
| **Billetterie** | `jTcVjBLVNqwkqP1cOFlszx` | https://www.figma.com/design/jTcVjBLVNqwkqP1cOFlszx | ✅ TERMINÉ (8 écrans, composants, fondations, couverture `5:820`) |
| **Audit** | `9ZC6QcFSzQkJGBh9WMwR8M` | https://www.figma.com/design/9ZC6QcFSzQkJGBh9WMwR8M | ⬜ Vide, à faire |

L'audit existe déjà en page HTML (artifact) : https://claude.ai/artifact/LaBZa8JBxnf4YghuWaLGZ8. Il faut le reproduire dans le fichier Figma Audit.

### Pages de la source `JSwsswVsC3TDbZIg5JlMpd`, où recopier le contenu

- Org-Expo · refonte `6021:2296`. Écrans :
  - Accueil `6023:2301`
  - Connexion `6023:2903`
  - Exposant Paiements `6024:2390`
  - Orga Paramètres `6025:2425`
  - Mon stand `6032:2506`
  - Documents `6032:2609`
  - Dossiers exposants `6033:2573`
  - Fiche exposant `6033:2764`
- Org-Expo · composants `6034:2296`
- AMMY · refonte `6013:2296`
- AMMY · composants `6043:2296`
- **Billetterie · refonte `6027:2296`**. Écrans :
  - Achat mobile : `6028:2302`, `6028:2380`, `6028:2423`
  - Scan : `6029:2349`, `6029:2372`, `6029:2391`, `6029:2415`
  - Organisateur billets : `6031:2356`
- **Billetterie · composants `6047:2296`**
- Les originaux de Martin sont intacts :
  - Org-Expo · maquettes (UI) `1:3417`
  - Org-Expo · wireframes (UX) `6006:1648`
  - AMMY · bénévoles `6006:1649`
  - Billetterie · écrans `1:13668`
  - Billetterie · parcours `6006:1650`
  - Usine `6006:1651`
  - Archives `0:1`

⚠️ On **ne peut pas copier de nœuds d'un fichier à l'autre**. Chaque projet est **reconstruit par script** dans son nouveau fichier. Lis les écrans de la source (`get_screenshot` / `get_metadata`) pour reproduire le contenu.

Pour les **images** :
1. Dans la source, crée un rectangle temporaire à la taille native avec le fill image.
2. Fais un `get_screenshot` et télécharge le PNG.
3. Envoie-le avec `upload_assets` dans le nouveau fichier (POST multipart, qui renvoie un imageHash).
4. Supprime le rectangle temporaire.

## Choix de design validés

- **AMMY** (bénévoles) : bleu #1B5EA4, police Roboto. Le créneau matin est en ambre, l'après-midi en bleu ciel. L'étoile signale un ancien bénévole. L'affectation se fait **par poste**.
- **Org-Expo** (organisateurs et exposants, deux côtés distincts) :
  - le hero est bleu nuit #0B2545, avec un accent orange clair dessus (contraste 5,6:1) ;
  - les boutons principaux sont orange foncé #C2410C (5,2:1) ;
  - titres en Montserrat, texte en Roboto ;
  - la page d'accueil comporte des filtres.
- **Billetterie** (projet séparé, même client) : violet #5033FF (6,4:1), police Inter. Les interrupteurs affichent leur état en texte. Mobile en 390 px, bureau en 1440 px.
- Structure commune à chaque fichier :
  - variables en 3 collections :
    - `Primitives` (scopes vides)
    - `Couleurs` (alias sémantiques : bg/…, text/…, border/…, status/{success,warning,danger,info,neutral}/{bg,fg})
    - `Espacements` (space/xs…4xl, radius/sm, md, lg, full)
  - styles de texte sans préfixe : Display, Titre page, Titre section, Titre carte, Corps, Corps petit, Libellé, Légende, Chiffre, Couverture (96 px) ;
  - style d'effet « Ombre carte ».
- Nommage des composants : `Atomes/…`, `Molécules/…`, `Organismes/…`, `Documentation/Note « Ce qui change »`. Chaque écran de la page Maquettes a une instance de Note posée dessous.

## Modèle à suivre : fichier AMMY (terminé)

- **Couverture** : cadre 1920×1080 sur la couleur de marque, avec :
  - un monogramme ;
  - l'étiquette « Refonte UX/UI · septembre 2026 » ;
  - un grand titre en style Couverture ;
  - un sous-titre ;
  - une rangée en bas : Pages / Contenu / Auteur Martin.
- **Maquettes** :
  - un titre « Titre · page » en 48 px avec une description ;
  - des libellés de rangée (« Rangée · … ») ;
  - les écrans espacés de 160 px ;
  - une Note dessous, de largeur min(écran, 560).
  - Un contrôle de chevauchement est fait par script.
- **Composants** :
  - un en-tête « Titre · Groupe » par groupe (titre, description, séparateur) ;
  - les éléments en rangées (largeur max 1800, espacement 64) ;
  - les variantes dans des cadres pointillés.
- **Fondations** : nuanciers groupés, spécimens de texte, démo des espacements et des rayons.

## État détaillé d'Org-Expo (`FOXmqau6hlGnSw8BMhTBGs`)

- Pages : Couverture `0:1`, Maquettes `1:2`, Composants `1:3`, Fondations `1:4`.
- ✅ Variables, styles de texte et Ombre carte.
- ✅ Images envoyées. Les rectangles « Image · … » sont sur Fondations, placés à y=-800. Hashes :
  - logo `aa5d0dcfe5a56e7fa79c801cac8dc847017eb1ae`
  - arbre `ce4f3e37c48d98203a1c571f8a4f1737b8a8e775`
  - affiche `6523cfef132caab8166bd03bc41bf39ce9eec2d5`
  - stand `8a5c39b25f4ffec31ef720842f0cc316344b2ce2`
- ✅ Composants créés et rangés sur la page Composants :
  - Atomes : Bouton (Principal, Secondaire, Discret, Danger, Clair), Badge, Onglet, Case à cocher, Avatar.
  - Molécules : Champ, Recherche, Filtre déroulant, Info, Tâche, Ressource, Outil, Étape, Ligne de montant, Bulle de message, Carte événement.
  - Organismes : En-tête site, En-tête espace (Exposant/Organisateur), Messagerie, Barre de sélection, Tableau dossiers/En-tête + Ligne, Tableau paiements/En-tête + Ligne, Ligne document.
  - Documentation : Note.
- ✅ Les 8 écrans sont construits et disposés sur Maquettes (3 rangées + Notes, aucun chevauchement) :
  - Accueil
  - Connexion
  - Exposant · Paiements
  - Exposant · Mon stand
  - Exposant · Documents
  - Organisateur · Paramètres
  - Organisateur · Dossiers exposants
  - Organisateur · Fiche exposant
- ✅ Fondations (couleurs, typo, espacements, rayons, ombre, images) et Couverture `10:280` terminées.

## Reste à faire ensuite

1. ✅ FAIT — **Billetterie** (`jTcVjBLVNqwkqP1cOFlszx`) :
   - pages, variables (violet #5033FF, Inter) et envoi de l'affiche ;
   - composants :
     - Atomes : Bouton 48 px, Badge, Case, Choix.
     - Molécules : Quantité, Interrupteur, Étape menu, Carte tarif, Champ, Option paiement, Info, Repère, Étapes d'achat, Phase.
     - Organismes : Barre du bas, Billet (QR en SVG), Bandeau de résultat (Valide / Déjà scanné / Refusé), En-tête tarifs, Ligne catégorie, Ligne tarif (1052 px).
   - 8 écrans à reproduire depuis la source `6027:2296` : 3 écrans d'achat mobile, 4 écrans de scan et 1 écran organisateur ;
   - Fondations et Couverture.
   - Données :
     - Pass 1 jour adulte 18 € (420/600)
     - Pass 1 jour enfant 9 € (96/200)
     - Pass week-end adulte 30 € (80/150)
     - Pack famille 48 € (16/50)
     - Invitations exposants gratuit (0/120, Masqué)
     - Jauge 660/1 000, recette 11 592 €
     - Achat : 3 billets, 45,00 €, Camille Durand
2. **Audit** (`9ZC6QcFSzQkJGBh9WMwR8M`) : reproduire l'audit HTML (lien de l'artifact plus haut). Il comprend :
   - une couverture ;
   - une page par projet, avec des cartes de constat : capture de l'original, pastille de gravité, texte ;
   - les décisions ;
   - un récapitulatif avec les liens vers les 3 fichiers.
   Les captures des originaux s'obtiennent via `get_screenshot` sur les pages d'origine de la source.
3. **Message final à Martin** :
   - les liens des 4 fichiers ;
   - les originaux restent dans le fichier source ;
   - pour la miniature : clic droit sur le cadre de couverture, puis « Set as thumbnail » (l'API ne le permet pas) ;
   - lui proposer la suite en choix cliquables.

## Règles techniques (Plugin API) apprises

- Une seule `setCurrentPageAsync` par script. Les couleurs vont de 0 à 1. Charger les polices avant de modifier du texte. Les scripts sont atomiques : une erreur annule tout.
- Définir `layoutSizingHorizontal/Vertical = 'FILL'/'HUG'` seulement **après** `appendChild`.
- `resize()` remet les sizing modes en FIXED. Il faut remettre `primaryAxisSizingMode='AUTO'` **après** le resize.
- `isExposedInstance = true` seulement une fois l'instance **à l'intérieur** du composant.
- Ne pas mettre de propriétés personnalisées sur les nœuds (`node.__x`). Pas de `figma.notify`, pas de `setFileThumbnailNodeAsync`.
- Pour lier une propriété texte, ne viser que les nœuds TEXT qui ne sont pas descendants d'une instance.

### Helpers réutilisés en tête de chaque script

```js
const vars=await figma.variables.getLocalVariablesAsync(); const V=n=>{const v=vars.find(v=>v.name===n); if(!v) throw new Error(n); return v;};
const paint=n=>figma.variables.setBoundVariableForPaint({type:'SOLID',color:{r:0,g:0,b:0}},'color',V(n));
const fill=(n,name)=>{n.fills=[paint(name)];}; const stroke=(n,name,w=1)=>{n.strokes=[paint(name)]; n.strokeWeight=w;};
const pad=(n,h,v)=>{n.setBoundVariable('paddingLeft',V(h));n.setBoundVariable('paddingRight',V(h));n.setBoundVariable('paddingTop',V(v));n.setBoundVariable('paddingBottom',V(v));};
const rad=(n,r)=>{['topLeftRadius','topRightRadius','bottomLeftRadius','bottomRightRadius'].forEach(k=>n.setBoundVariable(k,V(r)));};
const tstyles=await figma.getLocalTextStylesAsync(); const TS=n=>tstyles.find(s=>s.name===n); for(const s of tstyles) await figma.loadFontAsync(s.fontName);
function txt(chars,style,color,name){const t=figma.createText(); t.textStyleId=TS(style).id; t.characters=chars; fill(t,color); t.name=name||chars.slice(0,30); return t;}
function F(name,dir,gap,p){const f=figma.createFrame(); f.name=name; f.layoutMode=dir; f.primaryAxisSizingMode='AUTO'; f.counterAxisSizingMode='AUTO'; f.fills=[]; f.itemSpacing=gap||0; if(p) p.appendChild(f); return f;}
function spacer(p){const s=figma.createFrame(); s.fills=[]; s.resize(1,1); s.name='Espace'; p.appendChild(s); s.layoutGrow=1;}
function notIn(n,root){let p=n.parent; while(p&&p!==root){if(p.type==='INSTANCE') return false; p=p.parent;} return true;}
function tp(target,defs){for(const [name,layer,def] of defs){const k=target.addComponentProperty(name,'TEXT',def); const kids=target.type==='COMPONENT_SET'?target.children:[target]; for(const c of kids){const l=c.findOne(n=>n.type==='TEXT'&&n.name===layer&&notIn(n,c)); if(l) l.componentPropertyReferences={...(l.componentPropertyReferences||{}),characters:k};}}}
function setP(i,props){const keys=Object.keys(i.componentProperties); const o={}; for(const [n,v] of Object.entries(props)){const k=keys.find(k=>k.split('#')[0]===n); if(k)o[k]=v;} i.setProperties(o); return i;}
```

**Première action suggérée pour la nouvelle session :**
1. Faire un `get_metadata` sur les 4 fichiers pour vérifier leur état réel, car ce document a pu avancer depuis.
2. Reprendre à la première case ⬜.
