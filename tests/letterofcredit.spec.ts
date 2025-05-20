import { test, expect} from '../utils/testSetup';
import { typeofLC } from '../data/testData';
import fs from 'fs';

test('navigate to Initiate Letter of Credit', async ({ page }) => {
  test.setTimeout(60000); 
  await page.locator('.icon-menu').click();
  await page.getByRole('menuitem', { name: ' Trade Finance' }).click();
  await page.getByRole('menuitem', { name: 'Letter Of Credit / Contract' }).click();
  await page.getByRole('menuitem', { name: 'Import Letter of Credit /' }).click();
  await page.getByRole('menuitem', { name: 'Initiate Letter of Credit /' }).click();
  await expect(page).toHaveURL('http://172.20.3.151:7777/?page=lc-nav-bar');
  if(typeofLC.LCType == 'New'){
    //LC/Contract Details
    await page.getByRole('button', { name: 'Create LC/Contract' }).click();
    await expect(page).toHaveURL('http://172.20.3.151:7777/?page=initiate-letter-of-credit');
    await page.getByRole('combobox', { name: 'Applicant Account for Charges' }).click();
    await page.locator('li').filter({ hasText: /^AT30008010037$/ }).click();
    // For Branch no locator found
    // await page.locator('li').filter({ hasText: 'Chowk Yadgar Peshawar' }).click();
    await page.getByRole('combobox', { name: 'Applicant', exact: true }).click();
    await page.getByRole('listbox', { name: 'Applicant' }).locator('li').click();
    await page.locator('[id="applicantAddressline1\\|input"]').fill('Gulshan-e-Iqbal');
    await page.locator('[id="applicantAddressline2\\|input"]').fill('Karachi');
    await page.locator('[id="applicantAddressline3\\|input"]').fill('Pakistan');
    await page.locator('#oj-select-choice-applicantCountry').waitFor({ state: 'visible' });
    await page.locator('#oj-select-choice-applicantCountry').click();
    await page.locator('li').filter({ hasText: 'India' }).first().click();
    await page.getByRole('radio', { name: 'Transferable', exact: true }).check();
    await page.getByRole('radio', { name: 'Non Transferable' }).check();
    await page.getByRole('radio', { name: 'Sight' }).check();
    await page.getByRole('radio', { name: 'Usance' }).check();
    await page.getByRole('radio', { name: 'Mixed Payment' }).check();
    await page.getByRole('radio', { name: 'Yes' }).check();
    await page.getByRole('radiogroup', { name: 'Revolving', exact: true }).getByLabel('No').check();
    await page.getByRole('combobox', { name: 'Select Product' }).click();
    await page.locator('li').filter({ hasText: 'INSBLC- Import Negotiation' }).click();
    await page.getByTitle('Select Date.').click();
    await page.getByRole('button', { name: '31' }).click();
    await page.getByRole('textbox', { name: 'Place of Expiry' }).fill('Karachi');
    if(typeofLC.AddBene = 'New')
    {
    await page.getByRole('radio', { name: 'New' }).check();
    await page.getByRole('textbox', { name: 'Beneficiary Name' }).fill('Abc Bene');
    await page.getByRole('textbox', { name: 'Address' }).fill('Gulshan-e-Iqbal');
    await page.locator('[id="AddressLine25059124\\|input"]').fill('Karachi');
    await page.locator('[id="AddressLine32484206\\|input"]').fill('Pakistan');
    await page.getByRole('combobox', { name: 'Country' }).locator('a').click();
    await page.locator('#oj-listbox-results-Country7808846 li').filter({ hasText: 'Afghanistan' }).click();
    } else{
    await page.locator('span').filter({ hasText: 'Existing' }).first().click();
    await page.getByRole('combobox', { name: 'Beneficiary Name' }).click();
    await page.locator('li').filter({ hasText: 'HBA' }).click();
    }
    // LC Amount Currency No locator Found
    // await page.locator('li').filter({ hasText: 'USD' }).click();
    await page.getByRole('textbox', { name: 'LC Amount' }).fill('1000');
    await page.getByRole('textbox', { name: 'Under(%)' }).fill('5');
    await page.getByRole('textbox', { name: 'Above(%)' }).fill('5');
    await page.getByRole('textbox', { name: 'Additional Amount Covered' }).fill('Additional Amount');
  //No locator found for Margin Amount Currency
  // await page.getByRole('listbox', { name: 'PKR' }).locator('li').click();
   await page.getByRole('textbox', { name: 'Margin Amount' }).fill('25');
    await page.locator('#ojChoiceId_CreditAvailableBy4671901_selected').click();
    if(typeofLC.creditAvailableBy == 'Sight' || typeofLC.creditAvailableBy == 'Acceptance'){
      await page.getByRole('option', { name: typeofLC.creditAvailableBy }).click();
      if(typeofLC.CreditAvailableWith == 'Swift'){
      await page.getByRole('radio', { name: 'Swift Code' }).check();
      await page.locator('[id="availableWithSwiftCode\\|input"]').fill('CITIUS33');
      await page.getByRole('button', { name: 'Verify' }).click();
     }else{
     await page.getByRole('radio', { name: 'Bank Address' }).check();
     await page.getByRole('textbox', { name: 'Bank Details' }).fill('Citi Bank');
     }
    }else if(typeofLC.creditAvailableBy == 'Negotiation' || typeofLC.creditAvailableBy == 'Deferred_Payment' || typeofLC.creditAvailableBy == 'Mixed_Payment'){
      await page.getByRole('option', { name: typeofLC.creditAvailableBy }).click();
      await page.locator('[id="PaymentDetails5611307\\|input"]').fill('5%');
      if(typeofLC.CreditAvailableWith == 'Swift'){
      await page.getByRole('radio', { name: 'Swift Code' }).check();
      await page.locator('[id="availableWithSwiftCode\\|input"]').fill('CITIUS33');
      await page.getByRole('button', { name: 'Verify' }).click();
     }else{
     await page.getByRole('radio', { name: 'Bank Address' }).check();
     await page.getByRole('textbox', { name: 'Bank Details' }).fill('Citi Bank');
     }
    }else{
      console.log("Please Enter Correct Credit Available By Value in data/testData file");
    }
   if(typeofLC.DraftDetailsRequired == 'Yes'){
    await page.getByRole('link', { name: 'Add Another Draft' }).click();
    await page.locator('[id="Tenor7400660\\|input"]').fill('2');
    await page.locator('[id="CreditDaysFrom2667393\\|input"]').fill('2');
    await page.locator('[id="DraweeBank1492631\\|input"]').fill('2');
    await page.locator('[id="draftAmount\\|input"]').fill('1000');
   }
   await page.screenshot({ path: 'Screenshots/LC_Details.png', fullPage: true });
   await page.getByRole('button', { name: 'Next' }).click();

   // Goods and Shipment Details
   await page.getByRole('combobox', { name: 'Partial Shipment' }).click();
   await page.getByRole('option', { name: 'Allowed', exact: true }).click();
   await page.getByRole('combobox', { name: 'Trans-shipment' }).click();
   await page.getByRole('option', { name: 'Allowed', exact: true }).click();
   await page.locator('[id="PlaceofTaking21\\|input"]').fill('Karachi');
   await page.locator('[id="PortofLoading17\\|input"]').fill('Karachi');
   await page.locator('[id="PortofDischarge7\\|input"]').fill('Karachi');
   await page.locator('[id="PlaceofFinalDestination90\\|input"]').fill('Karachi');
   if(typeofLC.Shipment == 'Date'){
    await page.getByRole('radio', { name: 'Date' }).check();
    const today = new Date();
    const currentYear = today.getFullYear(); // e.g., 2025
    const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const currentMonth = monthNames[today.getMonth()]; // e.g., 'May'
    await page.getByTitle('Select Date.').click();
    await page.getByRole('button', { name: `${currentYear}` }).click();
    await page.getByRole('gridcell', { name: `${currentYear}` }).click();
    await page.getByRole('button', { name: currentMonth }).click();
    await page.getByRole('gridcell', { name: currentMonth }).click();
    await page.getByRole('gridcell', { name: '21' }).click();
   }else if(typeofLC.Shipment == 'Period'){
    await page.getByRole('radio', { name: 'Period' }).check();
    await page.locator('[id="ShipmentPeriod15\\|input"]').fill('15 Days');
   }else{
    console.log("Enter Correct Shipment Value on testData file")
   }
   await page.getByLabel('Goods and Shipment Details').getByText('Please Select').click();
   await page.getByRole('option', { name: 'United Arab Emirates' }).locator('span').click();
   await page.getByRole('link', { name: 'Add Goods' }).click();
   await page.getByRole('textbox', { name: 'Please Enter' }).fill('1000.1000');
   await page.locator('[id="Quantity36\\|input"]').fill('2');
   await page.getByRole('textbox', { name: 'Cost/Unit' }).fill('500');
   await page.getByText('NextSave As DraftCancelBack').click();
   await page.screenshot({ path: 'Screenshots/Goods&ShipmentDetails.png', fullPage: true });
   await page.getByRole('button', { name: 'Next' }).click();

   // Documents and Conditions
   await page.getByRole('textbox').first().waitFor({state: 'visible'});
   await page.getByRole('textbox').first().fill('Goods Description');
   await page.getByRole('textbox').nth(1).waitFor({state: 'visible'});
   await page.getByRole('textbox').nth(1).fill('Documents Description');
   await page.getByRole('textbox').nth(2).fill('Additional Conditions');
   function stripTime(dateString: string): Date {
   const date = new Date(dateString);
   return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
   const expiryDate = stripTime(typeofLC.expirydate);      // e.g. 2025-05-14T19:00:00.000Z
   const shipmentDate = stripTime(typeofLC.shipmentdate);  // e.g. 2025-05-30T19:00:00.000Z
   const diffInMs = shipmentDate.getTime() - expiryDate.getTime();
   const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
   expect(diffInDays).toBeGreaterThanOrEqual(0);
  // Proceed with logic
  let tenorDays: number;
  if (diffInDays <= 21) {
  tenorDays = diffInDays > 0 ? Math.floor(Math.random() * diffInDays) + 1 : 1;
} else {
  tenorDays = 21;
}
  // Step 4: Input the value (replace selector accordingly)
   await page.locator('[id="InputDays2748051\\|input"]').fill(tenorDays.toString());
   await page.getByRole('combobox', { name: 'Incoterms' }).click();
   await page.getByRole('option', { name: 'EX WORKS' }).click();
   await page.screenshot({ path: 'Screenshots/DocumentsandConditions.png', fullPage: true });
   await page.getByRole('button', { name: 'Next' }).click();

   //Instruction Tab
   if(typeofLC.Advisingbank == 'Swift'){
    await page.getByRole('radio', { name: 'Swift Code' }).check();
    await page.locator('[id="advBankSwiftCode\\|input"]').fill('CITIUS33');
    await page.getByRole('button', { name: 'Verify' }).click();
   }else{
    await page.getByRole('radio', { name: 'Name and Address' }).check();
    await page.getByRole('textbox', { name: 'Name' }).fill('Advising Bank Name');
    await page.getByRole('textbox', { name: 'Address' }).fill('Advising Bank Address 1');
    await page.locator('[id="AddressLine283\\|input"]').fill('Advising Bank Address 2');
    await page.locator('[id="AddressLine33\\|input"]').fill('Advising Bank Address 3');
   }
   await page.getByRole('textbox', { name: 'Special Payment Conditions for Beneficiary' }).fill('Special Payment For Bene');
   await page.getByRole('textbox', { name: 'Special Payment Conditions for Bank Only' }).fill('Special Payment For Bank');
   
   if(typeofLC.ConfirmationInstruction == 'Confirm'){
    if(typeofLC.ConfirmationInstructionParty == 'Swift'){
    await page.getByRole('radio', { name: 'Confirm', exact: true }).check();
    await page.getByRole('combobox', { name: 'Requested Confirmation Party' }).locator('a').waitFor({state: 'visible'});
    await page.getByRole('combobox', { name: 'Requested Confirmation Party' }).locator('a').click();
    await page.locator('li').filter({ hasText: 'Advise Through Bank' }).click();
    await page.locator('#RequestedConfirmationPartyDescription46 span').filter({ hasText: 'Swift Code' }).first().click();
    await page.getByRole('textbox', { name: 'Swift Code' }).fill('CITIUS33');
    await page.getByRole('button', { name: 'Verify' }).click();
  }else{
    await page.getByRole('radio', { name: 'Bank Address' }).check();
    await page.getByRole('textbox', { name: 'Bank Name' }).click();
    await page.locator('[id="Address17\\|input"]').click();
    await page.locator('[id="AddressLine253\\|input"]').click();
    await page.locator('[id="AddressLine367\\|input"]').click();
  }
   }else if(typeofLC.ConfirmationInstruction == 'May Confirm'){
    await page.getByRole('radio', { name: 'May Confirm' }).check();
    if(typeofLC.ConfirmationInstructionParty == 'Swift'){
      await page.getByRole('radio', { name: 'Confirm', exact: true }).check();
      await page.getByRole('combobox', { name: 'Requested Confirmation Party' }).locator('a').click();
      await page.locator('li').filter({ hasText: 'Advise Through Bank' }).click();
      await page.locator('#RequestedConfirmationPartyDescription46 span').filter({ hasText: 'Swift Code' }).first().click();
      await page.getByRole('textbox', { name: 'Swift Code' }).fill('CITIUS33');
      await page.locator('div').filter({ hasText: /^Verify$/ }).nth(3).click();
    }else{
      await page.getByRole('radio', { name: 'Bank Address' }).check();
      await page.getByRole('textbox', { name: 'Bank Name' }).click();
      await page.locator('[id="Address17\\|input"]').click();
      await page.locator('[id="AddressLine253\\|input"]').click();
      await page.locator('[id="AddressLine367\\|input"]').click();
    }
   }else if(typeofLC.ConfirmationInstruction == 'Without'){
    await page.getByRole('radio', { name: 'Without' }).check();
   }
   else{
    console.log('You have choosen Without Confirmation Instruction')
   }
   await page.getByRole('textbox', { name: 'Sender to Receiver Information' }).fill('Sender to Receiver');
   await page.getByRole('textbox', { name: 'Charges' }).fill('Charges');
   await page.screenshot({ path: 'Screenshots/Instruction.png', fullPage: true });
   await page.getByRole('button', { name: 'Next' }).click();

   //Attachment
 // Wait for the input[type="file"] to appear
// const fileInput = await page.locator('input[type="file"]');
// Upload multiple files (make sure to escape backslashes in Windows paths)
// console.log(fs.existsSync('C:/Users/Mibran/Desktop/sample document format/pdf.pdf'));
// console.log('path1', 'C:\\Users\\Mibran\\Desktop\\sample document format\\PNG File.png');

if (typeofLC.IsAttachmnet == 'Yes') {
   await page.locator('div').filter({ hasText: /^Drop files here or click here to Add Files$/ }).first().click();
await page.waitForSelector('oj-file-picker input[type="file"]');
await page.setInputFiles('oj-file-picker input[type="file"]', [
  'C:/Users/Mibran/Desktop/sample document format/pdf.pdf',
  'C:/Users/Mibran/Desktop/sample document format/PNG File.png'
]);
}
  
if (typeofLC.SaveasTemplate == 'Yes') {
  await page.getByRole('radio', { name: 'Yes' }).check();
  // await page.locator('span').filter({ hasText: 'Yes' }).nth(1).click();
  await page.getByRole('radio', { name: 'Public' }).check();
  await page.getByRole('textbox', { name: 'Template Name' }).fill('Automatedtest');
  // await page.getByRole('link', { name: '' }).click();
  await page.locator('#save10').click();
  await page.getByRole('button', { name: 'Continue' }).click();
}
  await page.locator('#AcceptTermsandConditions100 span').nth(1).click();
  await page.screenshot({ path: 'Screenshots/AttachmentTab.png', fullPage: true });
  await page.getByRole('button', { name: 'Submit' }).click();

  //Review SS
  await page.waitForURL('http://172.20.3.151:7777/?page=review-letter-of-credit');
  await page.locator('div').filter({ hasText: /^Attachments$/ }).first().click();
  await page.screenshot({ path: 'Screenshots/ReviewScreen.png', fullPage: true });

   }else if(typeofLC.LCType == 'RetryLC'){
   await page.getByRole('button', { name: 'Retry LC' }).click();
   }else if(typeofLC.LCType == 'Template'){
   await page.getByRole('button', { name: 'By Template' }).click();
   }else if(typeofLC.LCType == 'Cope&Initiate'){
   await page.getByRole('button', { name: 'Copy & Initiate' }).click();
   }else{
    console.log("Please Enter Correct Credit Available By Value in data/testData file");
    ('Please suggest any Letter of credit Type');
  }
})