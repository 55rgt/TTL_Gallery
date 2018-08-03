const Slider = function ($root, min, max) {
    const temp = $root.append(`
        <div class="slider-zone">
            <div class="bar">
                <div class="circle-left circle left" pos="left">
                    <div class="circle-number"></div>
                </div>
                <div class="circle-right circle right" pos="right">
                    <div class="circle-number"></div>
                </div>
            </div>
        </div>
    <div class="number-zone">
        <div class="number left">${min}</div>
        <div class="empty-zone"></div>
        <div class="number right">${max}</div>
    </div>
`);

    const $bar = $(temp.find('.bar'));
    const $circle = $(temp.find('.circle'));

    const points = [];
    const count = max - min + 1;


    const setPoints = function () {
        for (let i = min; i < max + 1; i++) {
            points[i] = ($bar.position().left + ($bar.width() / count) * (i - min));
        }

    };
    setPoints();

    const drawLine = () => {
        for (let i = min; i < max + 1; i++) {
            $bar.append(`<div class="line" style="left:${points[i] - points[min]}px"></div>`);
        }
        $bar.append(`<div class="line" style="left:${$bar.width() - points[min] + $bar.position().left}px"></div>`);
    };
    drawLine();

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
        const $left = $('.number.left');
        return $left.text()*1;
    };
    this.getRightValue = () => {
        const $right = $('.number.right');
        return $right.text()*1;

    };

    $circle.on('mousedown', function () {
        const dragItem = $(this);
        dragItem.attr('id', 'drag');
        const $drag = $('#drag');


        dragItem.on('mousemove', function (event) {
            if (event.clientX > $bar.position().left && event.clientX < $bar.position().left + $bar.width()) {
                $(this).css('left', `${event.clientX - $circle.width() / 2 - $bar.position().left}px`);
            }

            const mouseX = event.clientX;
            const mouseY = event.clientY;
            // if(mouseY > $bar.position().top && mouseY < $bar.position().top + $bar.height()) {
            if (mouseX < points[min]) {
                if ($drag.attr('pos') === 'left') {
                    temp.find('.number-zone>.left').text(`${min}`);
                }
                else {
                    temp.find('.number-zone>.right').text(`${min}`);
                }

            }

            else if (mouseX > points[min] && mouseX < points[max]) {
                for (let i = min; i < max + 1; i++) {
                    if (mouseX > points[i] && mouseX < points[i + 1]) {
                        if ($drag.attr('pos') === 'left') {
                            temp.find('.number-zone>.left').text(`${i}`);
                        }
                        else {
                            temp.find('.number-zone>.right').text(`${i}`);
                        }
                    }
                }
            }
            else {
                if ($drag.attr('pos') === 'left') {
                    temp.find('.number-zone>.left').text(`${max}`);
                }
                else {
                    temp.find('.number-zone>.right').text(`${max}`);
                }
            }
            // }
        });

    });

    this.mouseUp = function () {
        const $drag = $('#drag');
        $drag.off('mousemove');
        $drag.attr('id', '');

        // const mouseX = event.clientX;
        // const mouseY = event.clientY;
        // // if(mouseY > $bar.position().top && mouseY < $bar.position().top + $bar.height()) {
        //     if (mouseX < points[min]) {
        //         $drag.css('left', `${points[min] - $bar.position().left + $bar.width() / (count * 2) - $circle.width() / 2}px`);
        //         // if ($drag.attr('pos') === 'left') {
        //         //     temp.find('.number-zone>.left').text(`${min}`);
        //         // }
        //         // else {
        //         //     temp.find('.number-zone>.right').text(`${min}`);
        //         // }
        //
        //     }
        //
        //     else if (mouseX > points[min] && mouseX < points[max]) {
        //         for (let i = min; i < max + 1; i++) {
        //             if (mouseX > points[i] && mouseX < points[i + 1]) {
        //                 $drag.css('left', `${points[i] - $bar.position().left + $bar.width() / (count * 2) - $circle.width() / 2}px`);
        //                 // if ($drag.attr('pos') === 'left') {
        //                 //     temp.find('.number-zone>.left').text(`${i}`);
        //                 // }
        //                 // else {
        //                 //     temp.find('.number-zone>.right').text(`${i}`);
        //                 // }
        //             }
        //         }
        //     }
        //     else {
        //         $drag.css('left', `${points[max] - $bar.position().left + $bar.width() / (count * 2) - $circle.width() / 2}px`);
        //         // if ($drag.attr('pos') === 'left') {
        //         //     temp.find('.number-zone>.left').text(`${max}`);
        //         // }
        //         // else {
        //         //     temp.find('.number-zone>.right').text(`${max}`);
        //         // }
        //     }
        // // }
    };


    return this;
};
