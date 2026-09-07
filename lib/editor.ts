export type Kind = 'button' | 'chip' | 'card' | 'list' | 'appbar' | 'navbar' | 'dialog' | 'textfield' | 'switch' | 'slider' | 'image' | 'divider' | 'text' | 'shape';
export type Element = { id: string; type: Kind; x: number; y: number; w: number; h: number; text: string; subtext?: string; variant?: string; color?: string; fontSize?: number; group?: string; hidden?: boolean; locked?: boolean; src?: string };
export type Screen = { id: string; name: string; x: number; y: number; w: number; h: number; device: 'phone' | 'desktop'; fill: string; elements: Element[] };
export type Link = { id: string; from: string; element?: string; to: string; trigger: 'tap' | 'swipe-left' | 'swipe-right' | 'swipe-up' | 'swipe-down'; transition: 'slide' | 'fade' | 'scale' | 'none' };
export type Theme = { color: string; shape: number; font: string; motion: 'expressive' | 'standard' | 'none' };
export type Project = { version: 1; name: string; start: string; theme: Theme; screens: Screen[]; links: Link[] };
export const uid = () => crypto.randomUUID();
export const clone = <T,>(value: T): T => structuredClone(value);
export const library: { type: Kind; name: string; section: string; w: number; h: number; text: string }[] = [
  { type: 'button', name: 'Button', section: 'Actions & inputs', w: 280, h: 52, text: 'Continue' },
  { type: 'chip', name: 'Chips', section: 'Actions & inputs', w: 180, h: 40, text: 'For you, Popular' },
  { type: 'textfield', name: 'Text field', section: 'Actions & inputs', w: 300, h: 60, text: 'Your name' },
  { type: 'switch', name: 'Switch', section: 'Actions & inputs', w: 280, h: 52, text: 'Notifications' },
  { type: 'slider', name: 'Slider', section: 'Actions & inputs', w: 280, h: 48, text: 'Intensity' },
  { type: 'dialog', name: 'Dialog', section: 'Actions & inputs', w: 300, h: 190, text: 'A little reminder' },
  { type: 'card', name: 'Card', section: 'Layout & navigation', w: 304, h: 136, text: 'Make time for you' },
  { type: 'list', name: 'List', section: 'Layout & navigation', w: 304, h: 78, text: 'A fresh start' },
  { type: 'appbar', name: 'App bar', section: 'Layout & navigation', w: 360, h: 68, text: 'Your space' },
  { type: 'navbar', name: 'Navigation', section: 'Layout & navigation', w: 360, h: 78, text: 'Home, Explore, Saved' },
  { type: 'text', name: 'Text', section: 'Content', w: 300, h: 54, text: 'A little inspiration.' },
  { type: 'image', name: 'Image', section: 'Content', w: 304, h: 190, text: 'Add your image' },
  { type: 'divider', name: 'Divider', section: 'Content', w: 304, h: 16, text: '' },
  { type: 'shape', name: 'Expressive shape', section: 'Content', w: 170, h: 170, text: '' },
];
const e = (id: string, type: Kind, x: number, y: number, w: number, h: number, text: string, extra: Partial<Element> = {}): Element => ({id,type,x,y,w,h,text,...extra});
export const initialProject: Project = {
  version: 1, name: 'Mindful app', start: 'welcome', theme: {color:'#ae4b2c',shape:24,font:'Geist',motion:'expressive'},
  screens: [
    {id:'welcome', name:'Welcome', x:0,y:0,w:360,h:740,device:'phone',fill:'#fff8f2',elements:[
      e('w-brand','text',28,58,304,34,'mindful',{fontSize:25,variant:'brand'}),
      e('w-flower','shape',73,143,214,214,'',{variant:'flower'}),
      e('w-title','text',28,410,304,100,'A little pause.\nA better day.',{fontSize:40,variant:'center'}),
      e('w-desc','text',37,526,286,60,'Find your calm in the everyday.\nOne mindful moment at a time.',{fontSize:15,variant:'muted-center'}),
      e('w-start','button',28,621,304,55,'Find my calm',{variant:'arrow'}),
      e('w-foot','text',28,691,304,24,'A little space, just for you.',{fontSize:11,variant:'muted-center'})
    ]},
    {id:'explore',name:'Explore',x:460,y:0,w:360,h:740,device:'phone',fill:'#fffaf5',elements:[
      e('e-bar','appbar',0,40,360,66,'mindful',{variant:'home'}),
      e('e-greet','text',24,120,300,25,'MAKE ROOM FOR YOU',{fontSize:10,variant:'eyebrow'}),
      e('e-title','text',24,151,310,92,'How are you\nfeeling today?',{fontSize:36}),
      e('e-chips','chip',24,257,312,38,'All, Breathe, Focus, Sleep'),
      e('e-card','card',24,315,312,166,'A moment of calm',{subtext:'Let your mind take a little break.',variant:'featured'}),
      e('e-label','text',24,506,312,28,'Your daily reset',{fontSize:19}),
      e('e-list1','list',24,547,312,76,'Box breathing',{subtext:'4 min · Find your balance',variant:'breath'}),
      e('e-nav','navbar',0,662,360,78,'Home, Explore, Saved'),
    ]},
    {id:'breathe',name:'Breathe',x:920,y:0,w:360,h:740,device:'phone',fill:'#f6f5ed',elements:[
      e('b-bar','appbar',0,40,360,66,'Breathe',{variant:'back'}),
      e('b-chip','chip',120,128,120,34,'4 MIN SESSION',{variant:'single'}),
      e('b-title','text',24,188,312,52,'Come back to calm.',{fontSize:30,variant:'center'}),
      e('b-desc','text',32,247,296,54,'Follow the rhythm.\nLet everything else wait.',{fontSize:15,variant:'muted-center'}),
      e('b-circle','shape',69,344,222,222,'Breathe in',{variant:'breathing',color:'#d4dec3'}),
      e('b-slider','slider',50,589,260,25,'Session progress',{variant:'progress'}),
      e('b-end','button',28,655,304,52,'Finish session',{variant:'tonal'}),
    ]},
  ], links:[{id:'link1',from:'welcome',element:'w-start',to:'explore',trigger:'tap',transition:'slide'},{id:'link2',from:'explore',element:'e-card',to:'breathe',trigger:'tap',transition:'fade'},{id:'link3',from:'breathe',element:'b-end',to:'explore',trigger:'tap',transition:'fade'}]
};

export function tidyScreens(screens: Screen[]): Screen[] {
  let x=0,y=0,rowHeight=0;
  return screens.map(s=>{if(x && x+s.w>1800){x=0;y+=rowHeight+120;rowHeight=0;} const next={...s,x,y};x+=s.w+100;rowHeight=Math.max(rowHeight,s.h);return next;});
}
export function removeItems(project: Project, screenId: string, elementIds: string[]): Project {
  const p=clone(project);
  if(elementIds.length){ const s=p.screens.find(s=>s.id===screenId);if(s)s.elements=s.elements.filter(e=>!elementIds.includes(e.id));p.links=p.links.filter(l=>l.from!==screenId||!l.element||!elementIds.includes(l.element)); }
  else {p.screens=p.screens.filter(s=>s.id!==screenId);p.links=p.links.filter(l=>l.from!==screenId&&l.to!==screenId);if(p.start===screenId)p.start=p.screens[0]?.id??'';}
  return p;
}
export function moveGroup(elements: Element[], ids: string[], dx: number, dy: number, w: number, h: number, snap=true) {
  const selected=elements.filter(e=>ids.includes(e.id)); if(!selected.length)return elements;
  const left=Math.min(...selected.map(e=>e.x)),top=Math.min(...selected.map(e=>e.y));
  const right=Math.max(...selected.map(e=>e.x+e.w)),bottom=Math.max(...selected.map(e=>e.y+e.h));
  if(snap){dx=Math.round((left+dx)/8)*8-left;dy=Math.round((top+dy)/8)*8-top;}
  dx=Math.max(-left,Math.min(Math.max(-left,w-right),dx));dy=Math.max(-top,Math.min(Math.max(-top,h-bottom),dy));
  return elements.map(e=>ids.includes(e.id)?{...e,x:Math.round(e.x+dx),y:Math.round(e.y+dy)}:e);
}

export function validProject(value: unknown): value is Project {
  if(!value||typeof value!=='object')return false;
  const p=value as Project;
  const hex=(v:unknown)=>typeof v==='string'&&/^#[0-9a-f]{6}$/i.test(v);
  const ids=new Set<string>();
  const unique=(id:unknown)=>{if(typeof id!=='string'||!id||ids.has(id))return false;ids.add(id);return true;};
  if(p.version!==1||typeof p.name!=='string'||typeof p.start!=='string'||!p.theme||!hex(p.theme.color)||!['expressive','standard','none'].includes(p.theme.motion)||!Number.isFinite(p.theme.shape)||p.theme.shape<0||p.theme.shape>100||!['Geist','Arial','Serif'].includes(p.theme.font)||!Array.isArray(p.screens)||p.screens.length>100||!Array.isArray(p.links))return false;
  if(!p.screens.every(s=>s&&unique(s.id)&&typeof s.name==='string'&&[s.x,s.y,s.w,s.h].every(n=>Number.isFinite(n)&&Math.abs(n)<=100000)&&s.w>=24&&s.w<=2400&&s.h>=8&&s.h<=2000&&['phone','desktop'].includes(s.device)&&hex(s.fill)&&Array.isArray(s.elements)&&s.elements.length<=500&&s.elements.every(e=>e&&unique(e.id)&&library.some(c=>c.type===e.type)&&typeof e.text==='string'&&[e.x,e.y,e.w,e.h].every(n=>Number.isFinite(n)&&Math.abs(n)<=100000)&&e.w>0&&e.h>0&&['subtext','variant','group'].every(k=>e[k as keyof Element]===undefined||typeof e[k as keyof Element]==='string')&&(e.color===undefined||hex(e.color))&&(e.fontSize===undefined||(Number.isFinite(e.fontSize)&&e.fontSize>=8&&e.fontSize<=120))&&['hidden','locked'].every(k=>e[k as keyof Element]===undefined||typeof e[k as keyof Element]==='boolean')&&(e.src===undefined||(typeof e.src==='string'&&/^(https?:\/\/|data:image\/(png|jpeg|webp|gif);base64,)/i.test(e.src))))))return false;
  if(p.screens.length?!p.screens.some(s=>s.id===p.start):p.start!=='')return false;
  const actions=new Set<string>();
  return p.links.every(l=>{if(!l||!unique(l.id)||!p.screens.some(s=>s.id===l.to)||!p.screens.some(s=>s.id===l.from&&(l.element===undefined||s.elements.some(e=>e.id===l.element)))||!['tap','swipe-left','swipe-right','swipe-up','swipe-down'].includes(l.trigger)||!['slide','fade','scale','none'].includes(l.transition))return false;const key=JSON.stringify([l.from,l.element,l.trigger]);if(actions.has(key))return false;actions.add(key);return true;});
}
