import type { Project } from './editor';
import { generatePrompt, languages, type Language } from './prompt';

type Tool = { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: unknown) => unknown };
type Context = { registerTool: (tool: Tool, options: {signal: AbortSignal}) => void | Promise<void> };

export function registerPromptTool(getProject: () => Project) {
 const context=(document as Document & {modelContext?: Context}).modelContext;
 if(!context?.registerTool)return;
 const lifecycle=new AbortController();
 try{void Promise.resolve(context.registerTool({
  name:'generate_app_prompt', title:'Generate coding prompt',
  description:'Read the complete current Forma design and return a natural-language app-building prompt, including every screen, component, theme token and interaction. Does not modify the project or clipboard.',
  inputSchema:{type:'object',properties:{language:{type:'string',enum:Object.keys(languages)},notes:{type:'string',maxLength:10000}},additionalProperties:false},
  annotations:{readOnlyHint:true,untrustedContentHint:true},
  execute(input){
   if(!input||typeof input!=='object'||Array.isArray(input))throw new Error('Expected an object.');
   const {language='en',notes=''}=input as {language?:unknown;notes?:unknown};
   if(Object.keys(input).some(k=>!['language','notes'].includes(k))||typeof language!=='string'||!Object.hasOwn(languages,language)||typeof notes!=='string'||notes.length>10000)throw new Error('Use a supported language and text notes of at most 10,000 characters.');
   const p=getProject();return {name:p.name,screens:p.screens.length,interactions:p.links.length,language,prompt:generatePrompt(p,language as Language,notes)};
  },
 },{signal:lifecycle.signal})).catch(()=>lifecycle.abort());}catch{lifecycle.abort();}
 return ()=>lifecycle.abort();
}
