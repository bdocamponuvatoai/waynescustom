import type {Metadata} from 'next';
import {Header,Footer} from '../components/site/Shell';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://waynes-customs-automotive.arkostechnol-7313.chatgpt.site'),title:{default:'Wayne’s Customs | Automotive & Towing',template:'%s | Wayne’s Customs'},description:'Custom automotive ideas, vehicle care, and towing information. Explore Wayne’s Customs Automotive and Towing and prepare your next project.',robots:{index:false,follow:false},openGraph:{title:'Wayne’s Customs — Driven by detail.',description:'For the ride you love. And wherever it goes next.',images:[{url:'/assets/hero.webp',width:1536,height:1024}]},icons:{icon:'/favicon.svg'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><a href="#main" className="skip">Skip to content</a><Header/>{children}<Footer/></body></html>}
