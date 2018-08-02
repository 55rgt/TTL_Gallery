
const Slider = function ($root, min, max) {
    const temp = $root.append(`
        <div class="slider-zone">
            <div class="bar">
                <div class="circle left"><div class="circle-number"></div></div>
                <div class="circle right"><div class="circle-number"></div></div>
            </div>
        </div>
    <div class="number-zone">
        <div class="number left"></div>
        <div class="empty-zone"></div>
        <div class="number right"></div>
    </div>
`);

    const points = [];
    let count;

    const $bar = $(temp.find('.bar'));



    const setPoints = function () {
        count = max - min + 1;
        for(let i = 0; i < count; i++) {
            points.push($bar.position().left + ($bar.width()/count)*i);
        }

    };
    setPoints();

    const setLine = () => {
        for(let i = 0; i < points.length; i++) {
            $bar.append(`<div class="line" style="left:${points[i]}px"></div>`);
        }
    };
    setLine();

    //
    // const getLeftValue = function () {
    //     const $left = $('.circle:first');
    //     for(let i = 0; i < points.length; i++) {
    //         if($left.position().left + $bar.position().left - points[i] < 0) {
    //             return i-1;
    //         }
    //     }
    //     return points.length-1;
    // };
    // const getRightValue = () => {
    //     const $right = $('.circle:last');
    //     for(let i = 0; i < points.length; i++) {
    //         if($right.position().left + $bar.position().left - points[i] < 0) {
    //             return i-1;
    //         }
    //     }
    //     return points.length-1;
    //
    // };


    this.getLeftValue = function () {
        console.log(points);
        const $left = $('.circle:first');
        for(let i = min; i < points.length; i++) {
            console.log('aa', $left.position().left + $bar.position().left, points[i]);

            if($left.position().left + $bar.position().left - points[i] <= 0) {
                return i;
            }
        }
    };
    this.getRightValue = () => {
        const $right = $('.circle:last');
        for(let i = min; i < points.length; i++) {
            if($right.position().left + $bar.position().left - points[i] === 0) {
                return i;
            }
            else if($right.position().left + $bar.position().left - points[i] < 0) {
                return i;
            }
        }

    };

    const $circle = $(temp.find('.circle'));
    $circle.on('mousedown', function () {
        const dragItem = $(this);
        dragItem.attr('id', 'drag');


        dragItem.on('mousemove', function (event) {
            if(event.clientX > $bar.position().left && event.clientX < $bar.position().left + $bar.width()) {
                $(this).css('left', `${event.clientX - $circle.width()/2 - $bar.position().left}px`);
            }
        });

    });



    $(document).on('mouseup', function (event) {
        const $drag = $('#drag');
        $drag.off('mousemove');
        $drag.attr('id', '');

        const mouseX = event.clientX;

        if(mouseX < points[0]) {
            $drag.css('left', `${points[0] - $bar.position().left + $bar.width()/(count*2) -$circle.width()/2}px`);
            $drag.find('.circle-number').text(`0`);

        }

        else if(mouseX > points[0] && mouseX < points[points.length-1]) {
            for(let i = 0; i< points.length-1; i++) {
                if(mouseX > points[i] && mouseX < points[i+1]) {
                    $drag.css('left', `${points[i] - $bar.position().left + $bar.width()/(count*2) -$circle.width()/2}px`);
                    $drag.find('.circle-number').text(`${i}`);
                }
            }
        }
        else {
            $drag.css('left', `${points[points.length-1] - $bar.position().left + $bar.width()/(count*2) -$circle.width()/2}px`);
            $drag.find('.circle-number').text(`${points.length-1}`);

        }

    });


    return this;
};
