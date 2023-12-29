import { Deal } from "./models/deal.model";

export function colorByDealType(deal: Deal): string {
 if(deal.type === 'Development') {
   return '#178F82';
 } else if(deal.type === 'Acquisition') {
   return '#8764D8';
 } else {
   return '#F94B76';
 }
}