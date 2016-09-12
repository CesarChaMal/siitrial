ContactManager.Views.ContactForm = Backbone.View.extend({
  template: _.template($('#tpl-new-contact').html()),

  events: {
    'submit .contract-form': 'onFormSubmit'
  },

  render: function() {
    var html = this.template(_.extend(this.model.toJSON(), {
      isNew: this.model.isNew()
    }));
    this.$el.append(html);
    return this;
  },

  onFormSubmit: function(e) {
    e.preventDefault();
	var error = '';
$.ajax({
				type:'GET',
              contentType: 'application/json',
              cache :false,
				url:'http://localhost:8080/trades'
        +'?type='+ this.$('.type-input').val() 
				+'&customername='+ this.$('.customer-input').val()
        +'&valueDate='+ this.$('.valueDate-input').val()
        +'&tradeDate='+ this.$('.tradeDate-input').val()
        +'&ccyPair='+ this.$('.ccyPair-input').val()
        +'&style='+ this.$('.style-input').val()
        +'&expiryDate='+ this.$('.expiryDate-input').val()
        +'&premiumDate='+ this.$('.premiumDate-input').val()
        +'&deliveryDate='+ this.$('.deliveryDate-input').val()
        ,
				dataType:"json",
				success:function (data) {
           for (var x in data.errors) {           
            var html="<div class=";
            var icon ="";

            var n = data.errors[x].search("SUCESS");
            if (n != -1){
              html+="'alert alert-success' role='alert'";
              icon ="glyphicon glyphicon-ok";
            }else{
              html+="'alert alert-danger' role='alert'";
              icon ="glyphicon glyphicon-remove";
            }

            html+="> <span class='"+icon+"' aria-hidden='true'><span class='sr-only'></span>";
            html+="</span>"+ data.errors[x] +"</div>";

            $(".error" ).append(html);
            
           }
				}
        });
	
    //this.trigger('form:submitted', {
    //  customer: error + this.$('.customer-input').val(),
    //  tradeDate: this.$('.tradeDate-input').val(),
    //  type: this.$('.type-input').val(),
    //});
  }
});
