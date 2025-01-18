let abortFadeOut = false;

function startFadeOut(currentDraggingProduct) {
    const fadeOutStartTime = document.timeline.currentTime;

    requestAnimationFrame(fadeOut);

    function fadeOut(timestamp) {
        if (abortFadeOut) {
            abortFadeOut = false;
            return;
        };
    
        const elapsed = timestamp - fadeOutStartTime;
    
        const opacity = Math.max(1 - elapsed / 500, 0.5);
        currentDraggingProduct.style.opacity = String(opacity);
    
        if (opacity > 0.5) {
            requestAnimationFrame(fadeOut);
        }
    }
}

function startFadeIn(currentDraggingProduct) {
    abortFadeOut = true; // принудительно остановить анимацию исчезновения

    const fadeInStartTime = document.timeline.currentTime;
    const startOpacity = Number(currentDraggingProduct.style.opacity);

    requestAnimationFrame(fadeIn)

    function fadeIn(timestamp) {
        const elapsed = timestamp - fadeInStartTime;
    
        const opacity = Math.min(elapsed / 500 + startOpacity, 1);

        currentDraggingProduct.style.opacity = String(opacity);
    
        if (opacity < 1) {
            requestAnimationFrame(fadeIn);
            return;
        }
        
        currentDraggingProduct = null;
        abortFadeOut = false;
    }
}

/**
 *
 * @param currentDraggingProduct
 * @param {Object} position: {startXPosition: number, startYPosition: number, endXPosition: number, endYPosition:number};
 * @property {number} startXPosition
 * @property {number} startYPosition
 * @property {number} endXPosition
 * @property {number} endYPosition
 */
function startTransformToCorrectPosition(currentDraggingProduct, position) {
    const transformStartTime = document.timeline.currentTime;
    const { startXPosition, startYPosition, endXPosition, endYPosition } = position;

    const startDiffX =  endXPosition - startXPosition;
    const startDiffY = endYPosition - startYPosition;

    const { x, y } = currentDraggingProduct.getBoundingClientRect();
    
    const startPositionShiftX = startXPosition - x;
    const startPositionShiftY = startYPosition - y;

    currentDraggingProduct.style.transform = `translate(calc(${startPositionShiftX}px), calc(${startPositionShiftY}px))`;

    requestAnimationFrame(transformToCorrectPosition);

    function transformToCorrectPosition(timestamp) {
        const elapsed = timestamp - transformStartTime;

        const diffX = Math.max(Math.abs(startDiffX) - elapsed / 10, 0); // по модулю diff -> 0
        const diffY = Math.max(Math.abs(startDiffY) - elapsed / 10, 0); // по модулю diff -> 0

        const elapsedX = startDiffX - Math.sign(startDiffX) * diffX;
        const elapsedY = startDiffY - Math.sign(startDiffY) * diffY;

        currentDraggingProduct.style.transform = `translate(${startPositionShiftX + elapsedX}px, calc(${startPositionShiftY + elapsedY}px - 100%))`;

        if (diffX > 0 || diffY > 0) {
            requestAnimationFrame(transformToCorrectPosition);
        }
    }
}

/**
 * 
 * @param target 
 * @param {Object} options 
 * @property {number} maxOpacity
 * @property {number} minOpacity
 * @property {number} eps
 */
function startPulseAnimation(target, options) {
    const maxOpacity = options?.maxOpacity ?? 1;
    const minOpacity = options?.minOpacity ?? 0;
    const eps = options?.eps ?? 10000;

    let pulseAnimationStartTime = document.timeline.currentTime;
    let elapsedOpacity = target.style.opacity;
    let currentOpacityDirectionGrow = elapsedOpacity < maxOpacity ? true : false;

    requestAnimationFrame(pulseAnimation);

    function pulseAnimation(timestamp) {
        const elapsed = timestamp - pulseAnimationStartTime;

        if (currentOpacityDirectionGrow) {
            elapsedOpacity = Math.min(elapsedOpacity + elapsed / eps, maxOpacity);
            if (elapsedOpacity === maxOpacity) {
                currentOpacityDirectionGrow = false;
                pulseAnimationStartTime = timestamp;
            }
        } else {
            elapsedOpacity = Math.max(elapsedOpacity - elapsed / eps, minOpacity);
            if (elapsedOpacity === minOpacity) {
                currentOpacityDirectionGrow = true;
                pulseAnimationStartTime = timestamp;
            }
        }

        target.style.opacity = elapsedOpacity;

        requestAnimationFrame(pulseAnimation);
    }
}

export default {
    startFadeOut,
    startFadeIn,

    startTransformToCorrectPosition,
    startPulseAnimation
}