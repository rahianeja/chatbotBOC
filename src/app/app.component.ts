import { Component } from '@angular/core';
import * as AWS from 'aws-sdk';
import * as AWSCognito from 'amazon-cognito-identity-js'
import { CognitoUserPool, AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  textBatch = 'cd D:\\Developer\\ChatbotV2\\chatbot-git\nd:\ncd git add .\ngit commit -m "added chatbot code"\neb deploy';
  textLogic = 'var connector = new builder.ChatConnector';
  textConnection = 'var connector = new builder.ChatConnector';
  panelOpenState = true;
  urlBOC = "https://bcone.us1.sapbusinessobjects.cloud/sap/fpa/ui/tenants/003/app.html#;view_id=story;mode=embed;storyId=A4A8B35AD260C70FE10000000A6C9B30;f01Model=t.5.CFO_DASHBOARD_1:CFO_DASHBOARD_1;f01Dim=DSO;f01Val=1";
  urlTableau = "https://public.tableau.com/views/AnalysisonSuperstoreDataset/ProfitabilityDashboard?:embed=y&:display_count=yes&publish=yes";
  options = {};
  isDSO2 = false;
  currentUrl = "";
  fetchedUrl = "";
  params = "";
  obsUrl: Observable<{}>;
  items: Observable<any[]>;
  BOCItems: Observable<any[]>;


  constructor(private http: HttpClient, public db: AngularFireDatabase) {
    // this.obsUrl = db.object('Filters').valueChanges();
    // this.db.list('/Filters').push({ URL: "urlgoeshere", Source: "source goes here" });

    this.items = db.list('Filters/Tableau').valueChanges();
    this.BOCItems = db.list('Filters/BOC').valueChanges();
    this.pollTableauFilter();
    this.pollBOCFilter();
  }

  onChange = function (event) {

  }

  alterFilter = function () {
    // if(this.isDSO2){
    //   this.isDSO2 = false;
    // } else {
    //   this.isDSO2 = true;
    // }
    this.urlBOC = "https://bcone.us1.sapbusinessobjects.cloud/sap/fpa/ui/tenants/003/app.html#;view_id=story;mode=embed;storyId=A4A8B35AD260C70FE10000000A6C9B30;f01Model=t.5.CFO_DASHBOARD_1:CFO_DASHBOARD_1;f01Dim=DSO;f01Val=2";
  }

  pollTableauFilter = function () {
    console.log("value of obsURL: " + this.items.subscribe(res => {
      if (res[res.length - 1].result && res[res.length - 1].result.parameters && res[res.length - 1].result.parameters.country) {
        console.log(res)
        console.log("URL is : " + res[res.length - 1].result.parameters.country);
        this.fetchedUrl = res[res.length - 1].result.parameters.country;
        if (this.currentUrl != this.fetchedUrl) {
          this.updateTableauDash(this.fetchedUrl);
          this.currentUrl = this.fetchedUrl;
        }
      }
    }));
  }

  pollBOCFilter = function () {
    console.log("value of obsURL: " + this.BOCItems.subscribe(res => {
      if (res[res.length - 1].queryResult && res[res.length - 1].queryResult.parameters && res[res.length - 1].queryResult.parameters.DSO) {
        console.log(res)
        console.log("URL is : " + res[res.length - 1].queryResult.parameters.DSO);
        this.fetchedBOCFilter = res[res.length - 1].queryResult.parameters.DSO;
        if (this.currentBOCFilter != this.fetchedBOCFilter) {
          this.updateBOCDash(this.fetchedBOCFilter);
          this.currentBOCFilter = this.fetchedBOCFilter;
        }
      }
    }));
  }

  updateTableauDash = function (url) {
    // this.urlTableau = "https://public.tableau.com/views/AnalysisonSuperstoreDataset/PercentofTotalSales2?:showVizHome=no&:embed=true&:display_count=yes&Country=" + url;
    this.urlTableau = "https://public.tableau.com/views/AnalysisonSuperstoreDataset/ProfitabilityDashboard?:showVizHome=no&:embed=true&:display_count=yes&publish=yes&Country=" + url;
  }

  updateBOCDash = function (url) {
    // this.urlTableau = "https://public.tableau.com/views/AnalysisonSuperstoreDataset/PercentofTotalSales2?:showVizHome=no&:embed=true&:display_count=yes&Country=" + url;
    this.urlBOC = "https://bcone.us1.sapbusinessobjects.cloud/sap/fpa/ui/tenants/003/app.html#;view_id=story;mode=embed;storyId=A4A8B35AD260C70FE10000000A6C9B30;f01Model=t.5.CFO_DASHBOARD_1:CFO_DASHBOARD_1;f01Dim=DSO;f01Val=" + url + ";f02Dim=Location;f02Val=Bangalore";
  }

  // --------------------------------works with normal http------------------------------

  // this.http.get('https://analyticsbcone.firebaseio.com/Filters/URL.json').subscribe(data => {
  //   this.fetchedUrl = data;
  //   if (this.currentUrl != this.fetchedUrl) {
  //     this.updateTableauDash(this.fetchedUrl);
  //     this.currentUrl = this.fetchedUrl;
  //   }
  // });

  // keeps polling to check tableau URL change




  // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //   // IdentityPoolId: 'us-east-1:3868165b-fe99-4468-88e5-abc2db6ec3c7'
  //   IdentityPoolId: 'us-east-1:b2f3a615-8ae2-4ecb-90ed-a7f2edb9f59a'
  // });
  // AWS.config.region = 'us-east-1';
  // // AWS.config.update({ region: 'us-east-1' });


  // var poolData = {
  //   UserPoolId: 'us-east-1_94UVApPsv', // your user pool id here
  //   ClientId: 'cfid5krdtd2evcurb518cp7jt' // your app client id here
  // };
  // var userPool =
  //   new CognitoUserPool(poolData);
  // var userData = {
  //   Username: 'rohit.aneja@bcone.com', // your username here
  //   Pool: userPool
  // };


  // var authenticationData = {
  //   Username: 'rohit.aneja@bcone.com',
  //   Password: 'ASDasd123!'
  // };


  // var authenticationDetails =
  //   new AuthenticationDetails(authenticationData);

  // var cognitoUser =
  //   new CognitoUser(userData);
  // cognitoUser.authenticateUser(authenticationDetails, {
  //   onSuccess: function (result) {
  //     console.log('access token + ' + result.getAccessToken().getJwtToken());
  //   },

  //   onFailure: function (err) {
  //     alert(err);
  //   },
  //   mfaRequired: function (codeDeliveryDetails) {
  //     var verificationCode = prompt('Please input verification code', '');
  //     cognitoUser.sendMFACode(verificationCode, this);
  //   }
  // });





  // var ddb = new AWS.DynamoDB({ apiVersion: '2012-10-08' });

  // this.params = {
  //   TableName: 'BCL_CBOT_FILTERS',
  //   Key: {
  //     'FilterId': { N: '01' },
  //   },
  //   ProjectionExpression: 'URL'
  // }

  // ddb.getItem(this.params, function (err, data) {
  //   if (err) {
  //     console.log("Error", err);
  //   } else {
  //     this.fetchedUrl = data.Item;
  //     console.log("Success", data.Item);
  //   }
  // });


  download = function (filename, textBatch) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textBatch));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

  }

  showDash = function () {
    this.pollTableauFilter();
  }

  deploy = function () {
    console.log('deploying');
    console.log(this.textBatch);
    this.download('deploy.bat', this.textBatch);

    // window.open('deploy.bat')

  }

}
