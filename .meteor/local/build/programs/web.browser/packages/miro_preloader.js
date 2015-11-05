//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var _ = Package.underscore._;
var Router = Package['iron:router'].Router;
var RouteController = Package['iron:router'].RouteController;
var Iron = Package['iron:core'].Iron;

/* Package-scope variables */
var Preloader, PreloadController;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/miro_preloader/packages/miro_preloader.js                                                                  //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {                                                                                                         // 1
                                                                                                                       // 2
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                  //
// packages/miro:preloader/lib/client_route_controller.js                                                           //
//                                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                    //
// v1.2.3                                                                                                           // 1
                                                                                                                    // 2
var verbose = false,                                                                                                // 3
	setVerbose = function ( self ) {                                                                                   // 4
		verbose = (                                                                                                       // 5
			self.router.options.preload &&                                                                                   // 6
			self.router.options.preload.verbose &&                                                                           // 7
			( typeof console === 'object' )                                                                                  // 8
		);                                                                                                                // 9
	},                                                                                                                 // 10
                                                                                                                    // 11
	Console = {                                                                                                        // 12
		info : function ( params ) {                                                                                      // 13
			if ( verbose ) console.info( params );                                                                           // 14
		},                                                                                                                // 15
                                                                                                                    // 16
		warn : function ( params ) {                                                                                      // 17
			if ( verbose ) console.warn( params );                                                                           // 18
		},                                                                                                                // 19
                                                                                                                    // 20
		error: function ( params ) {                                                                                      // 21
			if ( verbose ) console.error( params );                                                                          // 22
		}                                                                                                                 // 23
	};                                                                                                                 // 24
                                                                                                                    // 25
Preloader = {                                                                                                       // 26
	loadLibs: function ( controller ) {                                                                                // 27
		var self          = this,                                                                                         // 28
			defaults      = {                                                                                                // 29
				// Default time-out for checking the library load                                                               // 30
				timeOut: 2000	// ms                                                                                             // 31
			},                                                                                                               // 32
			thisRoute     = controller.route,                                                                                // 33
			styleCounter,                                                                                                    // 34
                                                                                                                    // 35
			updateCachedList = function ( loadingList ) {                                                                    // 36
				for ( var key in loadingList ) {                                                                                // 37
					self.router._libs[ key ] = _.unique( _.union( self.router._libs[ key ] || [], loadingList[ key ] ) );          // 38
				}                                                                                                               // 39
			},                                                                                                               // 40
                                                                                                                    // 41
			loadStyles = function () {                                                                                       // 42
				var absoluteUrl = Meteor.absoluteUrl(),                                                                         // 43
					routeStyles = _.map( thisRoute._libs.sources.styles, function ( link ) {                                       // 44
						if ( _.isArray( link ) ) {                                                                                    // 45
							return _.map( link, function ( singleLink ) {                                                                // 46
								return singleLink.replace( absoluteUrl, '/' );                                                              // 47
							});                                                                                                          // 48
						} else {                                                                                                      // 49
							return link.replace( absoluteUrl, '/' );                                                                     // 50
						}                                                                                                             // 51
					}),                                                                                                            // 52
					currentStyles = _.map( $( 'link[ rel*=preload ]' ), function ( link ) {                                        // 53
						return link.href.replace( absoluteUrl, '/' );                                                                 // 54
					}),                                                                                                            // 55
					allStyles = _.union( currentStyles, routeStyles ),                                                             // 56
					excessStyles = _.difference( allStyles, routeStyles ),                                                         // 57
					retainedStyles = _.difference( currentStyles, excessStyles ),                                                  // 58
					newStyles = _.difference( routeStyles, retainedStyles );                                                       // 59
                                                                                                                    // 60
				// Remove excess styles                                                                                         // 61
				if ( excessStyles.length ) {                                                                                    // 62
					_.map( excessStyles, function ( style ) {                                                                      // 63
						$( 'link[ href="' + style + '" ]' ).remove();                                                                 // 64
                                                                                                                    // 65
						Console.warn( '[ Preloader - Styles ] Removing: ' + style );                                                  // 66
					});                                                                                                            // 67
				}                                                                                                               // 68
                                                                                                                    // 69
				if ( newStyles.length ) {                                                                                       // 70
					styleCounter = 0;                                                                                              // 71
                                                                                                                    // 72
					Console.info( '[ Preloader - Styles ] Loading initiated...' );                                                 // 73
                                                                                                                    // 74
					$.map( newStyles, function ( styleFile ) {                                                                     // 75
						styleCounter++;                                                                                               // 76
                                                                                                                    // 77
						$( 'head' ).append( '<link rel="preload stylesheet" type="text/css" href="' + styleFile + '"/>' );            // 78
                                                                                                                    // 79
						Console.info( '[ Preloader - Styles ] Loading ' + styleCounter + '/' + newStyles.length + ': ' + styleFile ); // 80
					});                                                                                                            // 81
                                                                                                                    // 82
					Console.info( '[ Preloader - Styles ] Loading finished.' );                                                    // 83
				}                                                                                                               // 84
			},                                                                                                               // 85
                                                                                                                    // 86
			loadAsync = function () {                                                                                        // 87
				var asyncLibs          = thisRoute._libs.sources.async,                                                         // 88
					beforeAsyncHandler = thisRoute._libs.onBeforeAsync,                                                            // 89
					asyncHandler       = thisRoute._libs.onAsync,                                                                  // 90
					afterAsyncHandler  = thisRoute._libs.onAfterAsync;                                                             // 91
                                                                                                                    // 92
				self._totalAsyncFiles = asyncLibs.length;                                                                       // 93
                                                                                                                    // 94
				if ( asyncLibs.length ) {                                                                                       // 95
                                                                                                                    // 96
					$.ajaxSetup({                                                                                                  // 97
						// Ensure asynchronous load                                                                                   // 98
						async: true                                                                                                   // 99
					});                                                                                                            // 100
                                                                                                                    // 101
					self._asyncCounter = 0;                                                                                        // 102
                                                                                                                    // 103
					Console.info( '[ Preloader - Async ] Loading initiated...' );                                                  // 104
                                                                                                                    // 105
					_.map( asyncLibs, function ( asyncLib ) {                                                                      // 106
						var beforeAsync = true,                                                                                       // 107
							afterAsync = true;                                                                                           // 108
                                                                                                                    // 109
						self._asyncCounter++;                                                                                         // 110
                                                                                                                    // 111
						if ( beforeAsyncHandler ) {                                                                                   // 112
							// Give user a chance to manipulate                                                                          // 113
							// particular library if needed                                                                              // 114
							beforeAsync = beforeAsyncHandler( asyncLib );                                                                // 115
						}                                                                                                             // 116
                                                                                                                    // 117
						if ( beforeAsync ) {                                                                                          // 118
                                                                                                                    // 119
							Console.info( '[ Preloader - Async ] Loading ' + self._asyncCounter + '/' + self._totalAsyncFiles + ': ' + asyncLib );
                                                                                                                    // 121
							$.getScript( asyncLib )                                                                                      // 122
								.done( function ( script, textStatus ) {                                                                    // 123
                                                                                                                    // 124
									Console.info( '[ Preloader - Async ] Loading ' + asyncLib + ': SUCCESS' );                                 // 125
                                                                                                                    // 126
									// Update list of loaded resources,                                                                        // 127
									// so we don't reload them                                                                                 // 128
									updateCachedList({                                                                                         // 129
										async: [ asyncLib ]                                                                                       // 130
									});                                                                                                        // 131
                                                                                                                    // 132
									if ( asyncHandler ) {                                                                                      // 133
										asyncHandler( null, {                                                                                     // 134
											// Send SUCCESS info back                                                                                // 135
											fileName  : asyncLib,                                                                                    // 136
											script    : script,                                                                                      // 137
											status    : textStatus,                                                                                  // 138
											counter   : self._asyncCounter,                                                                          // 139
											totalFiles: self._totalAsyncFiles                                                                        // 140
										});                                                                                                       // 141
									}                                                                                                          // 142
								})                                                                                                          // 143
								.fail( function ( jqxhr, textStatus, exception ) {                                                          // 144
                                                                                                                    // 145
									Console.error( '[ Preloader - Async ] Loading ' + asyncLib + ': ERROR - ' + jqxhr.status + ' (\'' + textStatus + '\'): \'' + exception.message + '\'' );
                                                                                                                    // 147
									if ( asyncHandler ) {                                                                                      // 148
										asyncHandler({                                                                                            // 149
											// Send Error info back                                                                                  // 150
											fileName  : asyncLib,                                                                                    // 151
											jqxhr     : jqxhr,                                                                                       // 152
											status    : textStatus,                                                                                  // 153
											exception : exception,                                                                                   // 154
											counter   : self._asyncCounter,                                                                          // 155
											totalFiles: self._totalAsyncFiles                                                                        // 156
										});                                                                                                       // 157
									}                                                                                                          // 158
								});                                                                                                         // 159
						}                                                                                                             // 160
                                                                                                                    // 161
						if ( afterAsyncHandler ) {                                                                                    // 162
							afterAsync = afterAsyncHandler( asyncLib );                                                                  // 163
						}                                                                                                             // 164
                                                                                                                    // 165
						if ( afterAsync ) {                                                                                           // 166
							// Update list of loaded resources,                                                                          // 167
							// so we don't reload them;                                                                                  // 168
							// May be prevented by custom code                                                                           // 169
							updateCachedList({                                                                                           // 170
								async: [ asyncLib ]                                                                                         // 171
							});                                                                                                          // 172
						}                                                                                                             // 173
					});                                                                                                            // 174
                                                                                                                    // 175
					Console.info( '[ Preloader - Async ] Initialization finished.' );                                              // 176
				} else {                                                                                                        // 177
					Console.info( '[ Preloader - Async ] All libraries already loaded.' );                                         // 178
				}                                                                                                               // 179
			},                                                                                                               // 180
                                                                                                                    // 181
			loadSync = function () {                                                                                         // 182
				var syncLibs = thisRoute._libs,                                                                                 // 183
					beforeSyncHandler = thisRoute._libs.onBeforeSync,                                                              // 184
					syncHandler       = thisRoute._libs.onSync,                                                                    // 185
					afterSyncHandler  = thisRoute._libs.onAfterSync;                                                               // 186
                                                                                                                    // 187
				if ( syncLibs.sources.sync.length && !syncLibs.ready ) {                                                        // 188
                                                                                                                    // 189
					Console.info( '[ Preloader - Sync ] Loading initiated...' );                                                   // 190
                                                                                                                    // 191
					$.ajaxSetup({                                                                                                  // 192
						// Ensure synchronous load                                                                                    // 193
						async: false                                                                                                  // 194
					});                                                                                                            // 195
                                                                                                                    // 196
					self._totalLibFiles = syncLibs.sources.sync.length;                                                            // 197
					self._libCounter = 1;                                                                                          // 198
                                                                                                                    // 199
					self._lib = {                                                                                                  // 200
						source   : syncLibs.sources.sync[ 0 ],                                                                        // 201
						isLoaded : false,                                                                                             // 202
						isChecked: false,                                                                                             // 203
						deps     : {                                                                                                  // 204
							loaded : new Tracker.Dependency(),                                                                           // 205
							checked: new Tracker.Dependency()                                                                            // 206
						}                                                                                                             // 207
					};                                                                                                             // 208
                                                                                                                    // 209
					self._markCurrentLoaded = function () {                                                                        // 210
						self._libCounter++;                                                                                           // 211
						self._lib.isLoaded = true;                                                                                    // 212
						self._lib.deps.loaded.changed();                                                                              // 213
					};                                                                                                             // 214
                                                                                                                    // 215
					self._isLoaded = function () {                                                                                 // 216
						self._lib.deps.loaded.depend();                                                                               // 217
                                                                                                                    // 218
						return self._lib.isLoaded;                                                                                    // 219
					};                                                                                                             // 220
                                                                                                                    // 221
					self._isChecked = function () {                                                                                // 222
						self._lib.deps.checked.depend();                                                                              // 223
                                                                                                                    // 224
						return self._lib.isChecked;                                                                                   // 225
					};                                                                                                             // 226
                                                                                                                    // 227
					self._preloadLib = function () {                                                                               // 228
						var beforeSync = true;                                                                                        // 229
                                                                                                                    // 230
						if ( beforeSyncHandler ) {                                                                                    // 231
							// Give user a chance to manipulate                                                                          // 232
							// particular library if needed                                                                              // 233
							beforeSync = beforeSyncHandler( self._lib.source );                                                          // 234
						}                                                                                                             // 235
                                                                                                                    // 236
						if ( beforeSync ) {                                                                                           // 237
                                                                                                                    // 238
							Console.info( '[ Preloader - Sync ] Loading ' + self._libCounter + '/' + self._totalLibFiles + ': ' + self._lib.source );
                                                                                                                    // 240
							$.getScript( self._lib.source )                                                                              // 241
								.done( function ( script, textStatus ) {                                                                    // 242
									self._markCurrentLoaded();                                                                                 // 243
								})                                                                                                          // 244
								.fail( function ( jqxhr, textStatus, exception ) {                                                          // 245
									// TODO: Better error handling                                                                             // 246
									Console.error( '[ Preloader - Sync ] Loading ' + self._libCounter + '/' + self._totalLibFiles + ': ERROR - ' + jqxhr.status + ' (\'' + textStatus + '\'): \'' + exception.message + '\'' );
								});                                                                                                         // 248
						}                                                                                                             // 249
                                                                                                                    // 250
						// Mark library loaded so we don't reload them;                                                               // 251
						// May be prevented by custom code                                                                            // 252
						self._markCurrentLoaded();                                                                                    // 253
					};                                                                                                             // 254
                                                                                                                    // 255
					self._preloadCheck = function () {                                                                             // 256
						// Call user's handler method(s) to let them                                                                  // 257
						// check if library finished initialization                                                                   // 258
						var afterSync = true,                                                                                         // 259
							timer = Meteor.setTimeout( function () {                                                                     // 260
								// Prevent endless run                                                                                      // 261
								self._lib.isChecked = true;                                                                                 // 262
                                                                                                                    // 263
								Meteor.clearTimeout( timer );                                                                               // 264
								Meteor.clearInterval( interval );                                                                           // 265
                                                                                                                    // 266
								self._lib.deps.checked.changed();                                                                           // 267
                                                                                                                    // 268
								Console.error( '[ Preloader - Sync ] Loading check: ERROR - Timeout' );                                     // 269
							}, routeLibs.timeOut ),                                                                                      // 270
                                                                                                                    // 271
							interval = Meteor.setInterval( function () {                                                                 // 272
								// Wait for library to finish loading                                                                       // 273
								try {                                                                                                       // 274
									self._lib.isChecked = syncHandler( self._lib.source );                                                     // 275
                                                                                                                    // 276
									if ( self._lib.isChecked ) {                                                                               // 277
                                                                                                                    // 278
										Meteor.clearTimeout( timer );                                                                             // 279
										Meteor.clearInterval( interval );                                                                         // 280
                                                                                                                    // 281
										self._lib.deps.checked.changed();                                                                         // 282
                                                                                                                    // 283
										Console.info( '[ Preloader - Sync ] Loading check: SUCCESS' );                                            // 284
                                                                                                                    // 285
										if ( afterSyncHandler ) {                                                                                 // 286
											afterSync = afterSyncHandler( self._lib.source );                                                        // 287
										}                                                                                                         // 288
                                                                                                                    // 289
										if ( afterSync ) {                                                                                        // 290
											// Update list of loaded resources, so we don't re-load them                                             // 291
											updateCachedList({                                                                                       // 292
												sync: [ self._lib.source ]                                                                              // 293
											});                                                                                                      // 294
										}                                                                                                         // 295
									}                                                                                                          // 296
								} catch ( error ) {                                                                                         // 297
									Console.error( '[ Preloader - Sync ] Loading check: ERROR - ' + error.message );                           // 298
								}                                                                                                           // 299
							}, 0 );	// Run as often as possible                                                                          // 300
					};                                                                                                             // 301
                                                                                                                    // 302
					self._deps = Tracker.autorun( function () {                                                                    // 303
                                                                                                                    // 304
						if ( self._isLoaded() ) {                                                                                     // 305
                                                                                                                    // 306
							if ( self._isChecked() ) {                                                                                   // 307
                                                                                                                    // 308
								syncLibs.sources.sync.shift();                                                                              // 309
                                                                                                                    // 310
								if ( syncLibs.sources.sync.length > 0 ) {                                                                   // 311
									self._lib.source = syncLibs.sources.sync[ 0 ];                                                             // 312
									self._lib.isLoaded = false;                                                                                // 313
									self._lib.isChecked = false;                                                                               // 314
									self._lib.deps.loaded.changed();                                                                           // 315
									self._lib.deps.checked.changed();                                                                          // 316
									self._preloadLib();                                                                                        // 317
								} else {                                                                                                    // 318
									// We're done.                                                                                             // 319
									self._deps.stop();                                                                                         // 320
									var routeName = syncLibs.controller.route.getName() || syncLibs.controller.route.path();                   // 321
                                                                                                                    // 322
									Console.info( '\n[ Preloader - End ] Loading route "' + routeName + '" finished.\n' );                     // 323
                                                                                                                    // 324
									syncLibs.ready = true;                                                                                     // 325
									syncLibs.readyDeps.changed();                                                                              // 326
								}                                                                                                           // 327
							} else if ( syncHandler ) {                                                                                  // 328
								self._preloadCheck();                                                                                       // 329
							} else {                                                                                                     // 330
								// Continue with loading if there are no preload check handlers                                             // 331
								// Update list of loaded resources anyway, so we don't re-load them                                         // 332
								updateCachedList({                                                                                          // 333
									sync: [ self._lib.source ]                                                                                 // 334
								});                                                                                                         // 335
                                                                                                                    // 336
								self._lib.isChecked = true;                                                                                 // 337
								self._lib.deps.checked.changed();                                                                           // 338
							}                                                                                                            // 339
						}                                                                                                             // 340
					});                                                                                                            // 341
                                                                                                                    // 342
					// Finally, do the deed!                                                                                       // 343
					self._preloadLib();                                                                                            // 344
                                                                                                                    // 345
				} else {                                                                                                        // 346
					syncLibs.ready = true;                                                                                         // 347
					syncLibs.readyDeps.changed();                                                                                  // 348
				}                                                                                                               // 349
                                                                                                                    // 350
				return {                                                                                                        // 351
					// Return object with ready() method to be called to check the status                                          // 352
					ready: function () {                                                                                           // 353
						syncLibs.readyDeps.depend();                                                                                  // 354
                                                                                                                    // 355
						return syncLibs.ready;                                                                                        // 356
					}                                                                                                              // 357
				};                                                                                                              // 358
			},                                                                                                               // 359
                                                                                                                    // 360
			routeName = thisRoute.getName() || thisRoute.path(),                                                             // 361
                                                                                                                    // 362
			routeLibs = _.extend( defaults, thisRoute.options.preload ),                                                     // 363
			// These get overridden by route's settings!                                                                     // 364
			controllerLibs = _.extend( defaults, controller.preload ),                                                       // 365
			routerLibs = _.extend( defaults, controller.router.options.preload );                                            // 366
                                                                                                                    // 367
		Console.info( '\n[ Preloader - Start ] Loading route "' + routeName + '"...\n\n' );                               // 368
                                                                                                                    // 369
		if ( !self.router ) {                                                                                             // 370
			self.router = controller.router;                                                                                 // 371
		}                                                                                                                 // 372
                                                                                                                    // 373
		if ( !self.router._libs ) {                                                                                       // 374
			self.router._libs = {                                                                                            // 375
				async: [],                                                                                                      // 376
				sync : []                                                                                                       // 377
			};                                                                                                               // 378
		}                                                                                                                 // 379
                                                                                                                    // 380
		if ( !thisRoute._libs ) {                                                                                         // 381
			thisRoute._libs = {                                                                                              // 382
				controller: controller,                                                                                         // 383
				sources  : {                                                                                                    // 384
					styles: [],                                                                                                    // 385
					async : [],                                                                                                    // 386
					sync  : []                                                                                                     // 387
				},                                                                                                              // 388
				onAsync  : null,                                                                                                // 389
				onSync   : null,                                                                                                // 390
				ready    : false,                                                                                               // 391
				readyDeps: new Tracker.Dependency()                                                                             // 392
			};                                                                                                               // 393
		}                                                                                                                 // 394
                                                                                                                    // 395
		// Router Libraries                                                                                               // 396
		if ( routerLibs.styles && typeof routerLibs.styles === 'string' ) {                                               // 397
			routerLibs.styles = ( routerLibs.styles === '' ) ? [] : [ routerLibs.styles ];                                   // 398
		}                                                                                                                 // 399
                                                                                                                    // 400
		if ( routerLibs.async && typeof routerLibs.async === 'string' ) {                                                 // 401
			routerLibs.async = ( routerLibs.async === '' ) ? [] : [ routerLibs.async ];                                      // 402
		}                                                                                                                 // 403
                                                                                                                    // 404
		if ( routerLibs.sync && typeof routerLibs.sync === 'string' ) {                                                   // 405
			routerLibs.sync = ( routerLibs.sync === '' ) ? [] : [ routerLibs.sync ];                                         // 406
		}                                                                                                                 // 407
                                                                                                                    // 408
		if ( routerLibs.onBeforeAsync && typeof routerLibs.onBeforeAsync === 'function' ) {                               // 409
			thisRoute._libs.onBeforeAsync = routerLibs.onBeforeAsync;                                                        // 410
		}                                                                                                                 // 411
                                                                                                                    // 412
		if ( routerLibs.onAsync && typeof routerLibs.onAsync === 'function' ) {                                           // 413
			thisRoute._libs.onAsync = routerLibs.onAsync;                                                                    // 414
		}                                                                                                                 // 415
                                                                                                                    // 416
		if ( routerLibs.onBeforeSync && typeof routerLibs.onBeforeSync === 'function' ) {                                 // 417
			thisRoute._libs.onBeforeSync = routerLibs.onBeforeSync;                                                          // 418
		}                                                                                                                 // 419
                                                                                                                    // 420
		if ( routerLibs.onSync && typeof routerLibs.onSync === 'function' ) {                                             // 421
			thisRoute._libs.onSync = routerLibs.onSync;                                                                      // 422
		}                                                                                                                 // 423
                                                                                                                    // 424
		// Route Controller Libraries                                                                                     // 425
		if ( controllerLibs.styles && typeof controllerLibs.styles === 'string' ) {                                       // 426
			controllerLibs.styles = ( controllerLibs.styles === '' ) ? [] : [ controllerLibs.styles ];                       // 427
		}                                                                                                                 // 428
                                                                                                                    // 429
		if ( controllerLibs.async && typeof controllerLibs.async === 'string' ) {                                         // 430
			controllerLibs.async = ( controllerLibs.async === '' ) ? [] : [ controllerLibs.async ];                          // 431
		}                                                                                                                 // 432
                                                                                                                    // 433
		if ( controllerLibs.sync && typeof controllerLibs.sync === 'string' ) {                                           // 434
			controllerLibs.sync = ( controllerLibs.sync === '' ) ? [] : [ controllerLibs.sync ];                             // 435
		}                                                                                                                 // 436
                                                                                                                    // 437
		if ( controllerLibs.onBeforeAsync && typeof controllerLibs.onBeforeAsync === 'function' ) {                       // 438
			thisRoute._libs.onBeforeAsync = controllerLibs.onBeforeAsync;                                                    // 439
		}                                                                                                                 // 440
                                                                                                                    // 441
		if ( controllerLibs.onAsync && typeof controllerLibs.onAsync === 'function' ) {                                   // 442
			thisRoute._libs.onAsync = controllerLibs.onAsync;                                                                // 443
		}                                                                                                                 // 444
                                                                                                                    // 445
		if ( controllerLibs.onBeforeSync && typeof controllerLibs.onBeforeSync === 'function' ) {                         // 446
			thisRoute._libs.onBeforeSync = controllerLibs.onBeforeSync;                                                      // 447
		}                                                                                                                 // 448
                                                                                                                    // 449
		if ( controllerLibs.onSync && typeof controllerLibs.onSync === 'function' ) {                                     // 450
			thisRoute._libs.onSync = controllerLibs.onSync;                                                                  // 451
		}                                                                                                                 // 452
                                                                                                                    // 453
		// Route Libraries                                                                                                // 454
		if ( routeLibs.styles && typeof routeLibs.styles === 'string' ) {                                                 // 455
			routeLibs.styles = ( routeLibs.styles === '' ) ? [] : [ routeLibs.styles ];                                      // 456
		}                                                                                                                 // 457
                                                                                                                    // 458
		if ( routeLibs.async && typeof routeLibs.async === 'string' ) {                                                   // 459
			routeLibs.async = ( routeLibs.async === '' ) ? [] : [ routeLibs.async ];                                         // 460
		}                                                                                                                 // 461
                                                                                                                    // 462
		if ( routeLibs.sync && typeof routeLibs.sync === 'string' ) {                                                     // 463
			routeLibs.sync = ( routeLibs.sync === '' ) ? [] : [ routeLibs.sync ];                                            // 464
		}                                                                                                                 // 465
                                                                                                                    // 466
		if ( routeLibs.onBeforeAsync && typeof routeLibs.onBeforeAsync === 'function' ) {                                 // 467
			thisRoute._libs.onBeforeAsync = routeLibs.onBeforeAsync;                                                         // 468
		}                                                                                                                 // 469
                                                                                                                    // 470
		if ( routeLibs.onAsync && typeof routeLibs.onAsync === 'function' ) {                                             // 471
			thisRoute._libs.onAsync = routeLibs.onAsync;                                                                     // 472
		}                                                                                                                 // 473
                                                                                                                    // 474
		if ( routeLibs.onBeforeSync && typeof routeLibs.onBeforeSync === 'function' ) {                                   // 475
			thisRoute._libs.onBeforeSync = routeLibs.onBeforeSync;                                                           // 476
		}                                                                                                                 // 477
                                                                                                                    // 478
		if ( routeLibs.onSync && typeof routeLibs.onSync === 'function' ) {                                               // 479
			thisRoute._libs.onSync = routeLibs.onSync;                                                                       // 480
		}                                                                                                                 // 481
                                                                                                                    // 482
		// Consolidate libraries                                                                                          // 483
		// Route settings override Route Controller settings,                                                             // 484
		// which in turn override Router.configure() settings                                                             // 485
		thisRoute._libs.sources = _.defaults(                                                                             // 486
			routeLibs,                                                                                                       // 487
			controllerLibs,                                                                                                  // 488
			routerLibs                                                                                                       // 489
		) || {};                                                                                                          // 490
                                                                                                                    // 491
		thisRoute._libs.sources.async  = _.difference(                                                                    // 492
			thisRoute._libs.sources.async,                                                                                   // 493
			controller.router._libs.async                                                                                    // 494
		) || [];                                                                                                          // 495
                                                                                                                    // 496
		thisRoute._libs.sources.sync  = _.difference(                                                                     // 497
			thisRoute._libs.sources.sync,                                                                                    // 498
			controller.router._libs.sync                                                                                     // 499
		) || [];                                                                                                          // 500
                                                                                                                    // 501
		if (                                                                                                              // 502
			thisRoute._libs.sources.styles &&                                                                                // 503
			thisRoute._libs.sources.styles.length &&                                                                         // 504
			!thisRoute._libs.sources.styles[ thisRoute._libs.sources.styles.length - 1 ]                                     // 505
		) {                                                                                                               // 506
			thisRoute._libs.sources.styles.pop();                                                                            // 507
		}                                                                                                                 // 508
                                                                                                                    // 509
		if (                                                                                                              // 510
			thisRoute._libs.sources.async.length &&                                                                          // 511
			!thisRoute._libs.sources.async[ thisRoute._libs.sources.async.length - 1 ]                                       // 512
		) {                                                                                                               // 513
			thisRoute._libs.sources.async.pop();                                                                             // 514
		}                                                                                                                 // 515
                                                                                                                    // 516
		if (                                                                                                              // 517
			thisRoute._libs.sources.sync.length &&                                                                           // 518
			!thisRoute._libs.sources.sync[ thisRoute._libs.sources.sync.length - 1 ]                                         // 519
		) {                                                                                                               // 520
			thisRoute._libs.sources.sync.pop();                                                                              // 521
		}                                                                                                                 // 522
                                                                                                                    // 523
		// Finally, load the resources                                                                                    // 524
		loadStyles();                                                                                                     // 525
                                                                                                                    // 526
		if ( thisRoute._libs.sources.async.length ) {                                                                     // 527
			loadAsync();                                                                                                     // 528
		} else {                                                                                                          // 529
			Console.info( '[ Preloader - Async ] All libraries are already loaded.' );                                       // 530
		}                                                                                                                 // 531
                                                                                                                    // 532
		if ( thisRoute._libs.sources.sync.length ) {                                                                      // 533
			thisRoute._libs.ready = false;                                                                                   // 534
			thisRoute._libs.readyDeps.changed();                                                                             // 535
                                                                                                                    // 536
			return loadSync();                                                                                               // 537
		} else {                                                                                                          // 538
			thisRoute._libs.ready = true;                                                                                    // 539
			thisRoute._libs.readyDeps.changed();                                                                             // 540
                                                                                                                    // 541
			Console.info( '[ Preloader - Sync ] All libraries are already loaded.' );                                        // 542
		}                                                                                                                 // 543
                                                                                                                    // 544
		Console.info( '\n[ Preloader - End ] Loading route "' + routeName + '" finished.\n' );                            // 545
                                                                                                                    // 546
		return {                                                                                                          // 547
			// Return object with ready() method to be called to check the status                                            // 548
			ready: function () {                                                                                             // 549
				// We're okay                                                                                                   // 550
				return true;                                                                                                    // 551
			}                                                                                                                // 552
		};                                                                                                                // 553
	}                                                                                                                  // 554
};                                                                                                                  // 555
                                                                                                                    // 556
if ( typeof PreloadController === 'undefined' ) {                                                                   // 557
	PreloadController = RouteController.extend({                                                                       // 558
		waitOn: function () {                                                                                             // 559
			var self = this;                                                                                                 // 560
                                                                                                                    // 561
			setVerbose( self );                                                                                              // 562
                                                                                                                    // 563
			return Preloader.loadLibs( self );                                                                               // 564
		},                                                                                                                // 565
                                                                                                                    // 566
		onStop: function () {                                                                                             // 567
			// Handle route redirection                                                                                      // 568
			var self      = this,                                                                                            // 569
				routeName = self.route._libs.controller.route.getName() ||                                                      // 570
							self.route._libs.controller.route.path();                                                                    // 571
                                                                                                                    // 572
			setVerbose( self );                                                                                              // 573
                                                                                                                    // 574
			if ( !self.route._libs.ready ) {                                                                                 // 575
				if ( self._deps ) self._deps.stop();                                                                            // 576
                                                                                                                    // 577
				self.route._libs.ready = false;                                                                                 // 578
				self.route._libs.readyDeps.changed();                                                                           // 579
                                                                                                                    // 580
				Console.warn( '\n[ Preloader - Stop ] Loading for route "' + routeName + '" interrupted! (probably redirection...)\n' );
			}                                                                                                                // 582
		}                                                                                                                 // 583
	});                                                                                                                // 584
}                                                                                                                   // 585
                                                                                                                    // 586
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       // 596
}).call(this);                                                                                                         // 597
                                                                                                                       // 598
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['miro:preloader'] = {
  Preloader: Preloader,
  PreloadController: PreloadController
};

})();
