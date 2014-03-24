CRunEventListener.CND_ONEVENT = 0;
CRunEventListener.CND_LAST = 1;

CRunEventListener.ACT_ADDLISTFOR = 0;

//CRunEventListener.EXP_FIRST = 0;

function CRunEventListener()
{
    this.events = {};
}

CRunEventListener.prototype = CServices.extend(new CRunExtension(), {
    getNumberOfConditions: function() {
        return CRunEventListener.CND_LAST;
    },
    createRunObject: function(file, cob, version) {
        return true;
    },
    condition: function(num, cnd) {
        switch (num)
        {
            case CRunEventListener.CND_ONEVENT:
                var slotname = cnd.getParamExpString(this.rh, 0);
                if (this.events[slotname].event) {
                    this.events[slotname].event = false;
                    return true;
                } else {
                    return false;
                }
        }
        return false;
    },
    action: function(num, act) {
        switch (num)
        {
            case CRunEventListener.ACT_ADDLISTFOR:
                var that = this;
                var slotname = act.getParamExpString(this.rh, 0);
                var listto = act.getParamExpString(this.rh, 1);
                var listfor = act.getParamExpString(this.rh, 2);

                if (!this.events[slotname]) {
                    this.events[slotname] = {};
                    this.events[slotname].event = false;
                }

                try {
                    eval(listto).addEventListener(listfor, function() {
                        that.events[slotname].event = true;
                        that.ho.generateEvent(CRunEventListener.CND_ONEVENT, 0);
                    });
                    
                } catch (err) {
                    console.log(err);
                }
                break;
        }
    }
    /*
     expression: function(num) {
     switch (num)
     {
     case CRunWebSockets.EXP_GETMESSAGE:
     var name = this.ho.getExpParam();
     return this.messages[name].message;
     }
     return 0;
     }
     */
});
