(function () {
    var titleBase = 'FemCraft Client';
    var spinner = ['-', '+', '|', '/', '-', '+', '|'];
    var titleIndex = 0;
    var titleString = '';
    var switchType = 0;

    function switchTitle() {
        if (titleIndex === titleBase.length) {
            titleIndex = 0;
            titleString = '';
        }

        if (switchType < spinner.length) {
            titleString = (switchType === 0 ? titleString : titleString.slice(0, -1)) + spinner[switchType];
            switchType++;
        } else {
            titleString = titleString.slice(0, -1) + titleBase.charAt(titleIndex);
            titleIndex++;
            switchType = 0;
        }

        document.title = titleString;
        setTimeout(switchTitle, 80);
    }

    switchTitle();
})();
