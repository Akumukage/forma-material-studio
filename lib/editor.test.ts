import assert from 'node:assert/strict';
import { initialProject, clone, validProject, removeItems, moveGroup, tidyScreens, type Project } from './editor.ts';
import { generatePrompt, languages } from './prompt.ts';

assert(validProject(initialProject));
const screen = initialProject.screens[0];
const deleted = removeItems(initialProject, 'welcome', ['w-start']);
assert(!deleted.links.some(l => l.element === 'w-start'));
assert(initialProject.links.some(l => l.element === 'w-start'), 'Mutations must not alter prior snapshots');
const crossScreen = removeItems(initialProject, 'explore', ['w-start', 'e-card']);
assert(crossScreen.links.some(l => l.element === 'w-start'), 'Deleting a selection cannot remove another screen’s links');
const removedScreen = removeItems(initialProject, 'welcome', []);
assert.equal(removedScreen.start, 'explore');
assert(removedScreen.links.every(l => l.from !== 'welcome' && l.to !== 'welcome'));
assert(validProject(removedScreen));
const moved = moveGroup(screen.elements, ['w-brand','w-flower'], 5000, 5000, screen.w, screen.h);
assert.equal(moved[1].x - moved[0].x, screen.elements[1].x - screen.elements[0].x);
assert.equal(moved[1].y - moved[0].y, screen.elements[1].y - screen.elements[0].y);
assert(moved.slice(0,2).every(e => e.x >= 0 && e.y >= 0 && e.x+e.w <= screen.w && e.y+e.h <= screen.h));
const arranged = tidyScreens([...initialProject.screens, {...screen,id:'desktop',w:1200,h:800,device:'desktop'}]);
for(let i=0;i<arranged.length;i++)for(let j=i+1;j<arranged.length;j++){
 const a=arranged[i],b=arranged[j];
 assert(a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y,'Tidy layout cannot overlap mixed screen sizes');
}
for(const language of Object.keys(languages) as (keyof typeof languages)[]){
 const text=generatePrompt(initialProject,language,'Use React.');
 for(const s of initialProject.screens)assert(text.includes(s.name));
 assert(text.includes('#ae4b2c')&&text.includes('360 × 740')&&text.includes('Use React.'));
 assert(text.includes('Find my calm')&&text.includes('Finish session'));
}
for(const mutate of [
 (p:Project)=>{p.start='missing'},
 (p:Project)=>{p.screens[0].elements[0].src=42 as unknown as string},
 (p:Project)=>{p.screens[0].elements[0].src='javascript:alert(1)'},
 (p:Project)=>{p.screens[0].elements[0].color={} as string},
 (p:Project)=>{p.screens[1].id=p.screens[0].id},
 (p:Project)=>{p.screens[0].device='tablet' as 'phone'},
 (p:Project)=>{p.links.push({...p.links[0],id:'duplicate-trigger'})},
]){const p=clone(initialProject);mutate(p);assert(!validProject(p));}
assert(!validProject(null));
assert(!validProject({version:1}));
assert(validProject({...clone(initialProject),screens:[],links:[],start:''}));
console.log('Passed: grouped geometry, mixed-device layout, link deletion, snapshot isolation, 4 prompt languages, and import validation.');
