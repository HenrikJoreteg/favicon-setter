// follow @HenrikJoreteg and @andyet if you like this ;)
// props to @mathias for this https://gist.github.com/428626 which served as starting point
// for this code.
(function (window) {
    var head = document && document.head,
        original;

    function findExisting() {
        var found = document.getElementById('magicon');
        if (found) return found;
        found = head && head.querySelector('link[rel="shortcut icon"], link[rel="icon"]');
        if (found) return found;
    }

    function removeExisting() {
        var found = findExisting();
        if (found) {
            original = original || found;
            head.removeChild(found);
        }
    }

    function setFavicon(url) {
        removeExisting();
        if (!url && original) {
            head.appendChild(original);
        } else {
            var link = document.createElement('link'),
                oldLink = document.getElementById('magicon');

            link.id = 'magicon';
            link.rel = 'shortcut icon';
            link.href = url;
            removeExisting();
            head.appendChild(link);
        }
    }

    // export for various crap :)
    if (typeof module !== 'undefined') {
        module.exports = setFavicon;
    } else if (typeof $ !== 'undefined') {
        $.setFavicon = function (url) {
            setFavicon(url);
            // so it's chainable
            return this;
        };
    } else {
        window.setFavicon = setFavicon;
    }
})(this);
