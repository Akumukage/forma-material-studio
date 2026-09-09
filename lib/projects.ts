import { clone, initialProject, uid, validProject, type Project } from './editor.ts';

export const PROJECT_PREFIX = 'forma-saved-project-v1:';
export const ACTIVE_PROJECT = 'forma-active-project-v1';
export const LEGACY_PROJECT = 'forma-project-v1';
type BrowserStorage = Pick<Storage, 'length' | 'key' | 'getItem' | 'setItem'>;
export type SavedProject = { id: string; revision: string; updatedAt: string; project: Project };

export function readProject(storage: BrowserStorage, id: string): SavedProject | null {
  const raw = storage.getItem(PROJECT_PREFIX + id);
  if (!raw) return null;
  const entry = JSON.parse(raw) as SavedProject;
  if (!entry || entry.id !== id || typeof entry.revision !== 'string' ||
      typeof entry.updatedAt !== 'string' || !Number.isFinite(Date.parse(entry.updatedAt)) || !validProject(entry.project)) {
    throw new Error('This saved project could not be read.');
  }
  return entry;
}

export function listProjects(storage: BrowserStorage): SavedProject[] {
  const entries: SavedProject[] = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!key?.startsWith(PROJECT_PREFIX)) continue;
    const entry = readProject(storage, key.slice(PROJECT_PREFIX.length));
    if (entry) entries.push(entry);
  }
  return entries.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function loadProject(storage: BrowserStorage): SavedProject {
  const entries = listProjects(storage);
  const current = entries.find(entry => entry.id === storage.getItem(ACTIVE_PROJECT)) || entries[0];
  if (current) return current;
  const raw = storage.getItem(LEGACY_PROJECT);
  const design: unknown = raw ? JSON.parse(raw) : clone(initialProject);
  if (!validProject(design)) throw new Error('The saved design could not be read. Its original data has been kept.');
  return saveProject(storage, uid(), design, null);
}

export function saveProject(storage: BrowserStorage, id: string, project: Project, revision: string | null): SavedProject {
  if (!validProject(project)) throw new Error('This design cannot be saved. Download a backup before reloading.');
  const previous = readProject(storage, id);
  if ((previous?.revision ?? null) !== revision) {
    throw new Error('This project changed in another tab. Download your work, then reload to avoid overwriting it.');
  }
  if (previous && JSON.stringify(previous.project) === JSON.stringify(project)) return previous;
  const entry = { id, revision: uid(), updatedAt: new Date().toISOString(), project: clone(project) };
  storage.setItem(PROJECT_PREFIX + id, JSON.stringify(entry));
  return entry;
}

export function newProject(name: string): Project {
  const id = uid();
  return { version: 1, name: name.trim() || 'Untitled project', theme: clone(initialProject.theme), start: id,
    screens: [{ id, name: 'Screen 1', x: 0, y: 0, w: 360, h: 740, device: 'phone', fill: '#fff8f2', elements: [] }], links: [] };
}
