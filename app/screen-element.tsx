'use client';
import { useState } from 'react';
import { ArrowRight, ArrowLeft, MoreHorizontal, Home, Compass, Bookmark, Play, Sparkles, Sun, ImageIcon, Check, Menu, Search, ChevronRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import type { Element } from '@/lib/editor';

export default function ScreenElement({element:e,preview=false,motion=true}:{element:Element;preview?:boolean;motion?:boolean}) {
  const [active,setActive]=useState(0);
  const labelStyle={fontSize:e.fontSize||undefined,color:e.color||undefined};
  switch(e.type){
    case 'text': return <div className={`screen-text ${e.variant||''}`} style={labelStyle}>{e.text}</div>;
    case 'button': return <button tabIndex={preview?0:-1} className={`m-button ${e.variant||''}`} style={e.color?{background:e.color}:undefined}>{e.text}{e.variant==='arrow'&&<ArrowRight size={20}/>}</button>;
    case 'chip': return <div className={`m-chips ${e.variant||''}`}>{e.text.split(',').map((text,i)=><button key={i} tabIndex={preview?0:-1} className={active===i?'chip-active':''} onClick={()=>setActive(i)}>{active===i&&e.variant!=='single'&&<Check size={13}/>} {text.trim()}</button>)}</div>;
    case 'appbar': return <div className={`m-appbar ${e.variant||''}`} style={e.color?{color:e.color}:undefined}><span>{e.variant==='back'?<ArrowLeft size={23}/>:e.variant==='home'?<span className="mini-flower"/>:<Menu size={22}/>}</span><strong>{e.text}</strong><span>{e.variant==='home'?<span className="avatar-small">J</span>:<MoreHorizontal size={22}/>}</span></div>;
    case 'navbar': return <nav className="m-navbar" style={e.color?{background:'var(--screen-tonal)'}:undefined}>{e.text.split(',').map((text,i)=>{const Icon=[Home,Compass,Bookmark][i%3];return <button key={i} tabIndex={preview?0:-1} onClick={()=>setActive(i)} className={active===i?'nav-active':''}><span><Icon size={22}/></span>{text.trim()}</button>})}</nav>;
    case 'card': return <div className={`m-card ${e.variant||''}`} style={e.color?{background:e.color}:undefined}><div className="card-top"><span className="card-tag"><Sparkles size={11}/> DAILY PRACTICE</span><div className="card-orbit"><span/><span/><span/></div></div><strong>{e.text}</strong><p>{e.subtext||'Something good starts here.'}</p><div className="card-bottom"><span>5 min · Mindful breathing</span><span className="card-play"><Play size={15} fill="currentColor"/></span></div></div>;
    case 'list': return <div className="m-list" style={e.color?{background:'var(--screen-tonal)',color:e.color}:undefined}><span className="list-symbol"><Sun size={25}/></span><div><strong>{e.text}</strong><p>{e.subtext||'A small step for your day'}</p></div><ChevronRight size={18}/></div>;
    case 'textfield': return <label className="m-field"><span>{e.text}</span><input tabIndex={preview?0:-1} placeholder={e.subtext||'Enter text'} /></label>;
    case 'switch': return <div className="m-switch"><span>{e.text}</span><Switch aria-label={e.text} defaultChecked tabIndex={preview?0:-1}/></div>;
    case 'slider': return <div className={`m-slider ${e.variant||''}`}>{e.variant!=='progress'&&<span>{e.text}</span>}<Slider aria-label={e.text} defaultValue={[35]} max={100} /></div>;
    case 'dialog': return <div className="m-dialog"><Sparkles size={25}/><strong>{e.text}</strong><p>{e.subtext||'Take a moment to check in with yourself.'}</p><div><button tabIndex={preview?0:-1}>Later</button><button tabIndex={preview?0:-1}>Got it</button></div></div>;
    case 'image': return e.src?<img className="m-image" src={e.src} alt={e.text}/>:<div className="m-image-placeholder" style={e.color?{background:'var(--screen-tonal)',color:e.color}:undefined}><ImageIcon size={35}/><span>{e.text}</span></div>;
    case 'divider': return <div className="m-divider" style={e.color?{borderColor:e.color}:undefined}/>;
    case 'shape': return e.variant==='breathing'?<div className={`breathing-shape ${preview&&motion?'is-breathing':''}`} style={e.color?{background:e.color}:undefined}><div><span>{e.text||'Breathe in'}</span><small>4 seconds</small></div></div>:<div className="expressive-flower" style={e.color?{color:e.color}:undefined}><div/><div/><div/><div/><span>✳</span></div>;
    default:return <span>{e.text}</span>;
  }
}
