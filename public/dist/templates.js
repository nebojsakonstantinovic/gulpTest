this["templates"] = this["templates"] || {};
this["templates"]["greeting"] = Handlebars.template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable;

  return "<p>Stating Now</p>\r\n<p>"
    + container.escapeExpression(((helper = (helper = helpers.PATKA || (depth0 != null ? depth0.PATKA : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"PATKA","hash":{},"data":data}) : helper)))
    + "</p>\r\n<p>Stoping</p>";
},"useData":true});