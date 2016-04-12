L.ShapeMarker = L.Path.extend({
	options: {
		fill: true,
		
		shape: 'triangle',
		size: 10
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
		this.size = this.options.size;
		this.shape = this.options.shape;
	},

	// @method setLatLng(latLng: LatLng): this
	// Sets the position of a diamond marker to a new location.
	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		this.redraw();
		return this.fire('move', {latlng: this._latlng});
	},

	// @method getLatLng(): LatLng
	// Returns the current geographical position of the diamond marker
	getLatLng: function () {
		return this._latlng;
	},

	// @method setRadius(radius: Number): this
	// Sets the radius of a diamond marker. Units are in pixels.
	setSize: function (radius) {
		this.options.size = this._size = size;
		return this.redraw();
	},

	// @method getRadius(): Number
	// Returns the current radius of the diamond
	getSize: function () {
		return this._size;
	},

	setStyle : function (options) {
		var size = options && options.size || this._size;
		L.Path.prototype.setStyle.call(this, options);
		this.setSize(size);
		return this;
	},

	_project: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._updateBounds();
	},

	_updateBounds: function () {
		var r = this._size,
		    r2 = this._sizeY || r,
		    w = this._clickTolerance(),
		    p = [r + w, r2 + w];
		this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
	},

	_update: function () {
		if (this._map) {
			this._updatePath();
		}
	},

	_updatePath: function () {
		this._renderer._updateShape(this);
	},

	_empty: function () {
		return this._size && !this._renderer._bounds.intersects(this._pxBounds);
	}
});


// @factory L.shapeMarker(latlng: LatLng, options? ShapeMarker options)
//
L.shapeMarker = function (latlng, options) {
	return new L.ShapeMarker(latlng, options);
};