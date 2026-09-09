import assert from 'node:assert/strict';
import { clone, initialProject, validProject } from './editor.ts';
import { ACTIVE_PROJECT, LEGACY_PROJECT, PROJECT_PREFIX, loadProject, listProjects, readProject, saveProject, newProject } from './projects.ts';

const values = new Map<string, string>();
let full = false;
const storage = {
  get length() { return values.size; },
  key: (index: number) => [...values.keys()][index] ?? null,
  getItem: (key: string) => values.get(key) ?? null,
  setItem: (key: string, value: string) => { if (full) throw new Error('Quota exceeded'); values.set(key, value); },
};
const legacy = clone(initialProject);
legacy.name = 'My existing design';
storage.setItem(LEGACY_PROJECT, JSON.stringify(legacy));
const first = loadProject(storage);
assert.deepEqual(first.project, legacy, 'Migration preserves screens, theme, and connections');
assert.equal(loadProject(storage).id, first.id, 'Reload does not duplicate legacy projects');
const blank = newProject('  Second project  ');
assert(validProject(blank));
assert.equal(blank.name, 'Second project');
assert.equal(blank.screens.length, 1);
assert.equal(blank.screens[0].elements.length, 0);
assert.equal(blank.links.length, 0);
assert.equal(newProject(' ').name, 'Untitled project');
const second = saveProject(storage, 'second', blank, null);
blank.name = 'Changed before switching';
const edited = saveProject(storage, second.id, blank, second.revision);
assert.equal(readProject(storage, second.id)?.project.name, blank.name, 'Immediate save before switching retains the latest edit');
assert.deepEqual(readProject(storage, first.id)?.project, legacy, 'Creating and editing another project leaves previous work intact');
assert.equal(listProjects(storage).length, 2);
storage.setItem(ACTIVE_PROJECT, first.id);
assert.equal(loadProject(storage).id, first.id, 'Reload restores the chosen project');
assert.deepEqual(JSON.parse(JSON.stringify(edited.project)), blank, 'Downloads retain a portable project');
assert(validProject(JSON.parse(JSON.stringify(edited.project))));
assert.throws(() => saveProject(storage, second.id, {...blank, name: 'Stale tab'}, second.revision), /another tab/);
assert.equal(readProject(storage, second.id)?.project.name, blank.name);
assert.equal(saveProject(storage, second.id, blank, edited.revision).revision, edited.revision, 'Unchanged saves preserve revision');
const before = [...values.entries()];
full = true;
assert.throws(() => saveProject(storage, second.id, {...blank, name: 'Unsaved edit'}, edited.revision), /Quota/);
assert.throws(() => saveProject(storage, 'third', newProject('New'), null), /Quota/);
assert.deepEqual([...values.entries()], before, 'Storage failure leaves all saved projects intact');
full = false;
storage.setItem(PROJECT_PREFIX + 'broken', '{invalid');
assert.throws(() => listProjects(storage));
assert.equal(storage.getItem(PROJECT_PREFIX + 'broken'), '{invalid', 'Unreadable data is not overwritten');
values.clear();
storage.setItem(LEGACY_PROJECT, '{invalid');
assert.throws(() => loadProject(storage));
assert.equal(values.size, 1);
console.log('Passed: legacy migration, blank projects, independent saves, reload, download round-trip, stale-tab protection, storage failure, and corrupt-data preservation.');
