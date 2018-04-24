sap.ui.define(["sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"./utilities",
	"sap/ui/core/routing/History"
], function(BaseController, MessageBox, Utilities, History) {
	"use strict";

	return BaseController.extend("com.sap.build.standard.dbiB1Wm014GenQrBarcode.controller.ListMatForGen", {
		address: "",
		handleRouteMatched: function(oEvent) {

			var oParams = {};
			if (oEvent.mParameters.data.context) {
				this.sContext = oEvent.mParameters.data.context;
				var oPath;
				if (this.sContext) {
					oPath = {
						path: "/" + this.sContext,
						parameters: oParams
					};
					this.getView().bindObject(oPath);
				}
			}

		},
		// base64Barcode: function(text) {
		// 	var canvas = document.createElement("canvas");
		// 	JsBarcode(canvas, text, {
		// 		format: "CODE39"
		// 	});
		// 	var dataURL = canvas.toDataURL("image/png");
		// 	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		// },
		_printZebra: function(printData) {
			var printList = [];
			for (var i = 0; i < printData.length; i++) {
				var label = printData[i]["label"];
				var printQty = printData[i]["printQty"];
				// var img = "http://www.barcodes4.me/barcode/c128b/"+label+".jpg";
				var img = "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";
				for (var j = 0; i < printQty; j++) {
					// var barcode = this.base64Barcode(label);
					
					printList.push(img);
				}
				debugger;

				// base64.push();
				// window.cordova.plugins.zbtprinter.printImage(base64, this.address,
				// 	function(success) {
				// 		alert("Print ok");
				// 	},
				// 	function(fail) {
				// 		alert(fail);
				// 	}
				// );

			}
			window.cordova.plugins.zbtprinter.discoverPrinters(
				function(MACAddress) {
					var address = MACAddress;
					window.cordova.plugins.zbtprinter.printImage(printList, address,
						function(success) {
							alert("Print ok");
						},
						function(fail) {
							alert(fail);
						}
					);
				},
				function(fail) {
					alert(fail);
				}
			);

		},
		_onPageNavButtonPress: function() {

			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			var oQueryParams = this.getQueryParameters(window.location);

			if (sPreviousHash !== undefined || oQueryParams.navBackToLaunchpad) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("default", true);
			}
		},
		getQueryParameters: function(oLocation) {

			var oQuery = {};
			var aParams = oLocation.search.substring(1).split("&");
			for (var i = 0; i < aParams.length; i++) {
				var aPair = aParams[i].split("=");
				oQuery[aPair[0]] = decodeURIComponent(aPair[1]);
			}
			return oQuery;

		},
		_onButtonPress: function(oEvent) {

			var sDialogName = "Dialog1";
			this.mDialogs = this.mDialogs || {};
			var oDialog = this.mDialogs[sDialogName];
			var oSource = oEvent.getSource();
			var oBindingContext = oSource.getBindingContext();
			var sPath = (oBindingContext) ? oBindingContext.getPath() : null;
			var oView;
			if (!oDialog) {
				this.getOwnerComponent().runAsOwner(function() {
					oView = sap.ui.xmlview({
						viewName: "com.sap.build.standard.dbiB1Wm014GenQrBarcode.view." + sDialogName
					});
					this.getView().addDependent(oView);
					oView.getController().setRouter(this.oRouter);
					oDialog = oView.getContent()[0];
					this.mDialogs[sDialogName] = oDialog;
					oDialog.getParent().getController().addCallBack(function(fnCallBack) {
						if (fnCallBack == "OK") {
							//do print

							var oTable = this.getView().byId("stable");

							// var aData = (oTable.getItems() || []).map(function(oItem) {
							// 	// assuming that you are using the default model  
							// 	return oItem.getBindingContext().getObject();
							// });
							var printData = [];
							for (var i = 0; i < oTable.getItems().length; i++) {
								var item = oTable.getItems()[i];
								var matID = item.getCells()[0].getTitle();
								var printQty = item.getCells()[2].getValue();
								var batch = item.getCells()[3].getText();
								printData.push({
									label: matID + batch,
									printQty: printQty
								});
							}
							// this._printZebra(printData);

						} else {
							//dont print
						}
					}.bind(this));
				}.bind(this));
			}

			return new Promise(function(fnResolve) {
				oDialog.attachEventOnce("afterOpen", null, fnResolve);
				oDialog.open();
				if (oView) {
					oDialog.attachAfterOpen(function() {
						oDialog.rerender();
					});
				} else {
					oView = oDialog.getParent();
				}

				var oModel = this.getView().getModel();
				if (oModel) {
					oView.setModel(oModel);
				}
				if (sPath) {
					var oParams = oView.getController().getBindingParameters();
					oView.bindObject({
						path: sPath,
						parameters: oParams
					});
				}
			}.bind(this)).catch(function(err) {
				if (err !== undefined) {
					MessageBox.error(err.message);
				}
			});

		},
		onInit: function() {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.getTarget("ListMatForGen").attachDisplay(jQuery.proxy(this.handleRouteMatched, this));

		}
	});
}, /* bExport= */ true);