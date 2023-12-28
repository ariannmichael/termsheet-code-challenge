/**
 * Model to represent the deal's information
 */
export interface Deal {
 id: number;
 name: string;
 type: string;
 purchasePrice: number;
 address: string;
 noi: number;
 capRate: number;
 image: string;
}