var HTTPS = require('https');
var exec = require('child_process').exec;
var fs = require('fs');

var botID = process.env.BOT_ID;

var niceComments = ["Are y'all talking about Alan? He is the nicest man I have ever met.",
                    "Can you teach me how to have game like Alan?",
                    "Alan is soooo cool",
                    "I only hope that my children become even half the man Alan Shepstone is.",
                    "Can you be my lunch date? @Alan",
                    "I just wanna be like Alan",
                    "Did you just mention Alan? Are you secretly in love with him?",
                    "Alan's gf application is still open. Apply today!",
                    "Alan is so awesome; everyone wants to be his friend.",
                    "Alan's beauty makes me stack overflow",
                    "Alan's beauty is illegal to have",
                    "Alansanity",
                    "No you can't be as good as Alan",
                    "You better be talkin' nice about Alan",
                    "Alan, teach me how to life.",
                    "I haven't seen a BOY as smart as Alan",
                    "<3",
                    "You just mentioned Alan. What do you want?",
                    "Sorry he has a girlfriend.",
                    "Every day is great day because of Alan.",
                    "Wow! Alan wasn't lying when he said he was hitting the gym!",
                    "I always feel safe when I am around Alan",
                    "Alan is the funniest dude I have ever met!",
                    "Women cannot keep their eyes off Alan",
                    "Alan has such a great smile",
                    "Alan is a risk worth taking.",
                    "Alan has the body of an anime character.",
                    "Alan has the body of an anime character.",
                    "Alan has the body of an anime character.",
                    "The tone of Alan's voice is really resonating with my chakras. He could save the entire world with that voice.",
                    "Alan has such a big heart <3",
                    "Alan has nice ankles",
                    "I have never met someone like Alan before",
                    "Alan is a risk worth taking.",
                    "Alan is a risk worth taking.",
                    "The tone of Alan's voice is really resonating with my chakras. He could save the entire world with that voice.",
                    "If Alan wasn't such a liberal, I would marry him yesterday!",
                    "Alan has such a big heart <3",
                    "If Alan wasn't such a liberal, I would marry him yesterday!",
                    "If Alan wasn't such a liberal, I would marry him yesterday!",
                    "If Alan wasn't such a liberal, I would marry him yesterday!",
                    "Alan has nice ankles",
                    "I have never met someone like Alan before",
                    "Alan inspires me",
                    "Alan is nothing less than special",
                    "Alan never ceases to amaze me (in a positive way).",
                    "Alan raises the bar",
                    "Alan's smile is proof that the best things in life are free.",
                    "If for some reason, our airplane was having trouble, I would help Alan with his oxygen mask before adjusting mine.",
                    "I am too old to waste my time without Alan.",
                    "Alan is HOT RICE",
                    "Alan is looking extra manly today",
                    "Alan keeps it so classy and clean shaven",
                    "I cannot help but blush around Alan",
                    "Alan is HOT RICE",
                    "Alan is looking extra manly today",
                    "Alan keeps it so classy and clean shaven",
                    "I cannot help but blush around Alan"
                    ];
function respond() {
    var compileFlag = false;
    var splitedStrs;
    var request = JSON.parse(this.req.chunks[0]);
    console.log(request);
    if (request.text) {
        console.log("spliting string here");
        splitedStrs = request.text.replace(/\s+/, '\x01').split('\x01');
    }else{
        splitedStrs = null;
    }
    console.log("Ending");
    if (splitedStrs != null && splitedStrs.length > 1) {
        var command = splitedStrs[0].toLowerCase();
        var content = splitedStrs[1].trim();
    }
    if (compileFlag == false) {
        console.log("It is here now.. Regular cases");
        var validText = request.text.indexOf("Alan") > -1 || request.text.indexOf("alan") > -1;
        

        var randPost = Math.random();
       
        if (request.text && validText && request.name != "Alan\'s Secret Admirer" ) {
            this.res.writeHead(200);
            postMessage(false, null, null);
            this.res.end();
        } else if (request.text && request.user_id == "15802842") {
            this.res.writeHead(200);
            var shouldPost = Math.random();
            if (shouldPost < 0.59) {
                postMessage(true, null, null);
            }else{
                console.log("don't care");
            }
            this.res.end();
        } else {
            console.log("don't care");
            this.res.writeHead(200);
            this.res.end();
        }
    }

}

function postMessage(claytonPost,errorMessage,content) {
  var botResponse, options, body, botReq,randomNumber;
    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };
    console.log("in post message");
    if (claytonPost){

       randomNumber = Math.random();
       if (randomNumber < 0.25) {
           botResponse = "The Hulk > Antman > literally anything > Captain America";
       }
       else if (randomNumber < 0.5) {
           botResponse = "@Ellen, Clayton has spoken";
       }
       else if (randomNumber < 0.75) {
           botResponse = "Notifying @Ellen";
       }
       else {
           botResponse = "@Clayton Iron Man sucks";
       }
   }else if (errorMessage != null){
       botResponse = errorMessage;
   } else if (content != null){
       console.log("In here!!!!!!!!");
       fs.writeFile("prog.py", content,
           function(err) {
               botReq = HTTPS.request(options, function(res) {
                   if(res.statusCode == 202) {
                       //neat
                   } else {
                       console.log('rejecting bad status code ' + res.statusCode);
                   }
               });
               if(err) {
                   console.log("Error code: " + err);
                   body = {
                       "bot_id": botID,
                       "text": "You don't know how to Python"
                   };
                   botReq.end(JSON.stringify(body));
               }
               var cmd = "python prog.py";
               exec(cmd,function(error,stdout,stderr){
                   if (error)
                   {
                       console.log("Error code: " + error);
                       body = {
                           "bot_id": botID,
                           "text": "You don't know how to Python"
                       };
                       botReq.end(JSON.stringify(body));
                   }
                   else
                   {
                       var claytonIndex = stdout.indexOf("@Clayton");
                       if (claytonIndex != -1){
                           body = {
                               "attachments": [ { loci: [[claytonIndex,8]], type: 'mentions', user_ids: ["15802842"] } ],
                               "bot_id": botID,
                               "text": stdout
                           }
                       }else {
                           body = {
                               "bot_id": botID,
                               "text": stdout
                           };
                       }
                       botReq.end(JSON.stringify(body));
                   }
               });
           });
       return;
   }
   else {
       botResponse = niceComments[Math.floor(Math.random() * (niceComments.length))];
   }

    if (botResponse.indexOf("@Ellen") != -1 && botResponse.indexOf("@Clayton") != -1){
        body = {
            "attachments": [ { loci: [[botResponse.indexOf("@Ellen"),6],[botResponse.indexOf("@Clayton"),8]], type: 'mentions', user_ids: ["20497030","15802842"] } ],
            "bot_id": botID,
            "text": botResponse
        };
    }else if (botResponse.indexOf("@Ellen") != -1){
      body = {
          "attachments": [ { loci: [[botResponse.indexOf("@Ellen"),6]], type: 'mentions', user_ids: ["20497030"] } ],
          "bot_id": botID,
          "text": botResponse
      };
  }else if (botResponse.indexOf("@Clayton") != -1){
      body = {
          "attachments": [ { loci: [[botResponse.indexOf("@Clayton"),8]], type: 'mentions', user_ids: ["15802842"] } ],
          "bot_id": botID,
          "text": botResponse
      };
  }
  else {
      body = {
          "bot_id": botID,
          "text": botResponse
      };
  }

  console.log('sending ' + botResponse + ' to ' + botID);
    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
