export const credentials = {
    userId: 'FileUploadMaker',
    password: 'Admin@151',
  };
  
  export const urls = {
    login: 'http://172.20.3.151:7777/',
    home: 'http://172.20.3.151:7777/?page=home',
  };

  export const typeofLC = {
     LCType: 'New',
     AddBene: 'New',
     expirydate: '21 May 2025',
     creditAvailableBy: 'Negotiation', //Sight, Acceptance | Negotiation, Deferred_Payment, Mixed_Payment
     CreditAvailableWith: 'Swift1',
     MarginAmountCurrency: 'PKR',
     DraftDetailsRequired: 'Yes',
    // Goods and Shipment Details
     Shipment: 'Date',   //Period
     shipmentdate: '31 May 2025',
     Advisingbank: 'Swift',
     ConfirmationInstruction: 'Confirm',   //Confirm, May Confirm, Without
     ConfirmationInstructionParty: 'Swift',  //Swift, BankAddress
     IsAttachmnet: 'No',        //Yes
     SaveasTemplate: 'No',      //Yes
  };
  