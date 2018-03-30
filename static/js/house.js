function favor(id, self) {
    self = $(self);
    if (self.html() === '收藏') {
        $.post("/favorite",
            {
                _id: id,
                favor: true
            },
            function (data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
                self.css('text-muted');
                self.html('已收藏');
            });

    } else {
        $.post("/favorite",
            {
                _id: id,
                favor: false
            },
            function (data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
                self.css('text-black');
                self.html('收藏')
            });

    }
};

function online(id, self) {
    self = $(self);
    if (self.html() === '未上线') {
        $.post("/online",
            {
                _id: id,
                online: true
            },
            function (data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
                self.css('text-muted');
                self.html('已上线');
            });

    } else {
        $.post("/online",
            {
                _id: id,
                online: false
            },
            function (data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
                self.css('text-black');
                self.html('未上线')
            });

    }
};

function search(self) {

    var q = $(self).find('input').val();
    action = self.action;
    self.action = action.replace('_X_', q);
    return true;
};