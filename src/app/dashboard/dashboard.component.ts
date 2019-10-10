import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as moment from "moment";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashBoardComponent implements OnInit {
    status: string;
    cliamStage: string;
    diseaseModel: string;
    title = 'Welcome to BlockChain Dashboard!';
    verifyPolicyNumberStatus: boolean;
    enterBillDetailsStatus: boolean;
    previewBillDetailsStatus: boolean;
    claimInsuranceStatus: boolean;
    claimInsuranceFinalStatus: boolean;
    TreatmentTypes: {};
    private fieldArray: Array<any> = [];
    private newAttribute: any = {};
    policyNumberModel: number;
    verifyBillDetailResponse: any;
    verifyGlobalDataFailureResponse: any;

    constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService) { }

    ngOnInit(): void {
        this.cliamStage = "Verify Policy Number";
        this.TreatmentTypes = [
            { id: 0, type: "--select--" },
            { id: 1, type: "Accident" },
            { id: 2, type: "Illness" }
        ];
        this.newAttribute.TreatmentType = 0;
    }

    addFieldValue() {
        this.spinnerService.show();
        this.status = "";
        if (this.newAttribute.TreatmentType == 0) {
            this.spinnerService.hide();
            this.setStatus("Please select treatment type");
            return true;
        }
        if (this.newAttribute.BillNumber == undefined || this.newAttribute.BillNumber.trim() == "") {
            this.spinnerService.hide();
            this.setStatus("Please enter bill number");
            return true;
        }
        if (this.newAttribute.BillAmount == undefined || this.newAttribute.BillAmount.trim() == "") {
            this.spinnerService.hide();
            this.setStatus("Please enter bill amount");
            return true;
        }

        var result = this.filterByValue(this.TreatmentTypes, +this.newAttribute.TreatmentType);
        this.newAttribute.TreatmentType = result["type"];
        this.fieldArray.push(this.newAttribute)
        this.newAttribute = {};
        this.newAttribute.TreatmentType = result["id"];
        this.spinnerService.hide();
    }

    filterByValue(array, search): string {
        var result = array.filter(function (item) { return (item.id == search); });
        return result[0];
    }

    deleteFieldValue(index) {
        this.fieldArray.splice(index, 1);
    }

    verifyPolicyNumber(): any {
        this.spinnerService.show();
        this.status = "";
        if (this.policyNumberModel == undefined || this.policyNumberModel == null) {
            this.spinnerService.hide();
            this.setStatus("Please enter policy number");
            return true;
        }

        const data = { Event: "Policy match", Policy: this.policyNumberModel, RequestStatus: "Success", Source: "Get Well Hospital", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A") };
        console.log(data);

        if (+this.policyNumberModel === 123456 || +this.policyNumberModel === 234567 || +this.policyNumberModel === 343244 || +this.policyNumberModel === 343245) {
            this.spinnerService.hide();
            this.verifyPolicyNumberStatus = true;
            this.cliamStage = "Enter Bill Details";

            const data = { Event: "Policy match success", Policy: this.policyNumberModel, RequestStatus: "Success", Source: "Green Insurance", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A") };
            console.log(data);
        } else {
            this.spinnerService.hide();
            this.setStatus("Invalid Policy Number..");
            const data = { Event: "Policy match success", Policy: this.policyNumberModel, RequestStatus: "Failure", Source: "Green Insurance", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A") };
            console.log(data);
        }
    }

    enterBillDetails(): any {
        this.spinnerService.show();
        this.status = "";
        if (this.fieldArray.length == 0) {
            this.spinnerService.hide();
            this.setStatus("Please add bill details");
            return true;
        }

        this.enterBillDetailsStatus = true;
        this.cliamStage = "Preview Bill Details";
        this.spinnerService.hide();
    }

    previewBillDetails(): void {
        this.spinnerService.show();
        this.verifyGlobalDataFailureResponse = null;
        this.status = "";

        const responseSuccess = {
            RequestStatus: "Success",
            TotalAmount: 1212,
            ClaimedAmount: 2323,
            BalanceAmount: 53454
        };

        const responseFailure = {
            RequestStatus: "Failure",
            TotalAmount: 1212,
            ClaimedAmount: 1212,
            BalanceAmount: 1212
        };

        const responseGlobalDataFailure = {
            RequestStatus: "Failure",
            TotalAmount: 1212,
            ClaimedAmount: 1212,
            BalanceAmount: 1212,
            HospitalName: "Global Hospital",
            TreatmentDate: "02-02-2017"
        };

        const data = { Event: "Claim details submitted", Policy: this.policyNumberModel, RequestStatus: "Success", Source: "Get Well Hospital", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A") };
        console.log(data);

        if (+this.policyNumberModel === 123456) {
            this.spinnerService.hide();
            this.verifyBillDetailResponse = responseSuccess;
            this.previewBillDetailsStatus = true;
            this.cliamStage = "Claim Insurance";
            this.claimInsuranceFinalStatus = true;
            const data = {
                BalanceAmount: "23423", ClaimedAmount: "34534", TotalAmount: "345", Event: "Payment processed",
                Policy: this.policyNumberModel, RequestStatus: "Success", Source: "Green Insurance", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A")
            };
            console.log(data);

        } else if (+this.policyNumberModel === 234567) {
            this.spinnerService.hide();
            this.verifyBillDetailResponse = responseSuccess;
            this.previewBillDetailsStatus = true;
            this.cliamStage = "Claim Insurance";
            this.claimInsuranceFinalStatus = true;

            if (+this.policyNumberModel === 234567) {
                const dataRequest = {
                    Event: "Health record fetch", Policy: this.policyNumberModel, RequestStatus: "Success",
                    Source: "Global Health Data", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A")
                };
                console.log(dataRequest);

                const dataResponse = {
                    Event: "Health record fetch success", Policy: this.policyNumberModel,
                    RequestStatus: "Success", Source: "Global Health Data",
                    Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A"), HealthData: {
                        HospitalName: "Global Hospital",
                        TreatmentDate: "02-02-2017"
                    }
                };

                this.verifyGlobalDataFailureResponse = responseGlobalDataFailure;
                console.log(dataRequest);

                const data = {
                    BalanceAmount: "23423", ClaimedAmount: "34534", TotalAmount: "345", Event: "Payment processed",
                    Policy: this.policyNumberModel, RequestStatus: "Success", Source: "Green Insurance", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A")
                };
                console.log(data);
            }
        } else if (+this.policyNumberModel === 343245) {
            this.spinnerService.hide();
            this.previewBillDetailsStatus = true;
            this.cliamStage = "Claim Insurance";
            this.claimInsuranceFinalStatus = true;
            this.verifyGlobalDataFailureResponse = responseGlobalDataFailure;
            this.verifyBillDetailResponse = responseGlobalDataFailure;

            if (+this.policyNumberModel === 343245) {
                const dataRequest = {
                    Event: "Health record fetch", Policy: this.policyNumberModel, RequestStatus: "Success",
                    Source: "Global Health Data", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A")
                };
                console.log(dataRequest);

                const dataResponse = {
                    Event: "Health record fetch success", Policy: this.policyNumberModel,
                    RequestStatus: "Success", Source: "Global Health Data",
                    Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A"), HealthData: {
                        HospitalName: "Global Hospital",
                        TreatmentDate: "02-02-2017"
                    }
                };
                console.log(dataResponse);

                this.verifyGlobalDataFailureResponse = responseGlobalDataFailure;
                this.verifyBillDetailResponse = responseGlobalDataFailure;
                const data = {
                    BalanceAmount: "23423", ClaimedAmount: "34534", TotalAmount: "345", Event: "Payment processed",
                    Policy: this.policyNumberModel, RequestStatus: "Failure", Source: "Green Insurance", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A")
                };
                console.log(data);
            }
        } else if (+this.policyNumberModel === 343244) {
            this.spinnerService.hide();
            this.previewBillDetailsStatus = true;
            this.cliamStage = "Claim Insurance";
            this.claimInsuranceFinalStatus = true;

            if (+this.policyNumberModel === 343244) {

                this.verifyBillDetailResponse = responseSuccess;
                const data = {
                    BalanceAmount: "23423", ClaimedAmount: "34534", TotalAmount: "345", Event: "Payment processed",
                    Policy: this.policyNumberModel, RequestStatus: "Success", Source: "Green Insurance", Date: moment(new Date()).format("DD/MM/YYYY"), Time: moment(new Date()).format("HH:mm:ss A")
                };
                console.log(data);
            }
        }
    }

    claimInsurance(): void {
        this.spinnerService.show();
        this.claimInsuranceStatus = true;
        this.cliamStage = "Verify Policy Number";
        this.status = "";
        this.policyNumberModel = null;
        this.fieldArray = [];
        this.newAttribute = {};
        this.newAttribute.TreatmentType = 0;
        this.spinnerService.hide();
    }

    ngClassVerifyPolicyNumber(): string {
        if (this.cliamStage === "Verify Policy Number") {
            return "bc_complete_active";
        }
        if (this.verifyPolicyNumberStatus === true) {
            return "bc_complete";
        }
        return "";
    }

    ngClassEnterBillDetails(): string {
        if (this.verifyPolicyNumberStatus) {
            if (this.cliamStage === "Enter Bill Details") {
                return "bc_complete_active";
            }
            if (this.enterBillDetailsStatus === true) {
                return "bc_complete";
            }
        }
        return "";
    }

    ngClassPreviewBillDetails(): string {
        if (this.cliamStage === "Preview Bill Details") {
            return "bc_complete_active";
        }
        if (this.previewBillDetailsStatus === true) {
            return "bc_complete";
        }
        return "";
    }

    ngClassClaimInsurance(): string {
        if (this.cliamStage === "Claim Insurance") {
            return "bc_complete_active";
        }
        if (this.claimInsuranceStatus === true) {
            return "bc_complete";
        }
        return "";
    }

    verifyPolicyNumberHeader(): void {
        this.status = "";
        if (this.verifyPolicyNumberStatus && !this.previewBillDetailsStatus) {
            this.cliamStage = "Verify Policy Number";
        }
    }

    enterBillDetailsHeader(): void {
        this.status = "";
        if (this.verifyPolicyNumberStatus && !this.previewBillDetailsStatus) {
            this.cliamStage = "Enter Bill Details";
        }
    }

    previewBillDetailsHeader(): void {
        this.status = "";
        if (this.enterBillDetailsStatus && !this.previewBillDetailsStatus) {
            this.cliamStage = "Preview Bill Details";
        }
    }

    claimInsuranceHeader(): void {
        this.status = "";
        if (this.previewBillDetailsStatus && !this.previewBillDetailsStatus) {
            this.cliamStage = "Claim Insurance";
        }
    }

    setStatus = message => {
        this.status = message;
    };
}