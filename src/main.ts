import './header.css';
import Index from './Header';

window.shared = {Header: Index};

declare global {
  interface Window {
    shared: any;
  }
}
