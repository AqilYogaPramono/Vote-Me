(function() {
    // Expose modal helper globally so other modules can call it
    window.AppUI = window.AppUI || {};
    window.AppUI.showMessageModal = function(message, title) {
        $('#appMessageModalTitle').text(title || 'Informasi');
        $('#appMessageModalBody').html(message || '');
        $('#appMessageModal').modal('show');
    }
    function isMobile() {
        return window.matchMedia('(max-width: 991.98px)').matches;
    }

    function closeSidebar() {
        $('#sidebar').removeClass('active');
        $('body').removeClass('sidebar-mobile-open');
    }

    $(document).on('click', '.navbar-toggler[data-toggle="offcanvas"]', function() {
        if (isMobile()) {
            setTimeout(function() {
                $('body').toggleClass('sidebar-mobile-open', $('#sidebar').hasClass('active'));
            }, 0);
        }
    });

    $(document).on('click', function(e) {
        if (!isMobile()) return;
        var $target = $(e.target);
        var clickInsideSidebar = $target.closest('#sidebar').length > 0;
        var clickOnToggler = $target.closest('.navbar-toggler[data-toggle="offcanvas"]').length > 0;
        if (!clickInsideSidebar && !clickOnToggler) {
            closeSidebar();
        }
    });

    $(document).on('click', '#sidebar .nav-link', function() {
        if (isMobile()) {
            closeSidebar();
        }
    });

    $(document).on('keydown', function(e) {
        if (isMobile() && e.key === 'Escape') {
            closeSidebar();
        }
    });

    $(window).on('resize', function() {
        if (!isMobile()) {
            $('body').removeClass('sidebar-mobile-open');
            $('#sidebar').removeClass('active');
        }
    });

    function showLoading() {
        var overlay = document.querySelector('.loading-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.innerHTML = '<div class="loading-spinner"></div>';
            document.body.appendChild(overlay);
        }
        overlay.classList.add('active');
    }

    function hideLoading() {
        var overlay = document.querySelector('.loading-overlay');
        if (overlay) overlay.classList.remove('active');
    }

    $(document).on('submit', 'form[data-loading], form', function() {
        showLoading();
    });

    var pendingDeleteUrl = null;
    $(document).on('click', '.btn-delete', function() {
        pendingDeleteUrl = this.getAttribute('data-url');
        $('#modalConfirmDelete').modal('show');
    });

    $(document).on('click', '#btnConfirmDelete', function() {
        if (!pendingDeleteUrl) return;
        $('#modalConfirmDelete').modal('hide');
        showLoading();
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = pendingDeleteUrl;
        document.body.appendChild(form);
        form.submit();
    });
})();

(function() {
    function dismissFlash(el) {
        if (!el) return;
        el.style.animation = 'flash-out 180ms ease-in forwards';
        setTimeout(function(){
            if (el && el.parentNode) el.parentNode.removeChild(el);
        }, 200);
    }

    function setupFlash() {
        var container = document.querySelector('.flash-container');
        if (!container) return;

        var flashes = container.querySelectorAll('.flash');
        flashes.forEach(function(el){
            var closeBtn = el.querySelector('.flash-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function(){ dismissFlash(el); });
            }
            if (el.classList.contains('flash-success')) {
                setTimeout(function(){ dismissFlash(el); }, 6000);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupFlash);
    } else {
        setupFlash();
    }
})();

// Password toggle functionality
(function() {
    function setupPasswordToggle() {
        $(document).on('click', '.password-toggle-btn', function() {
            var $btn = $(this);
            var targetId = $btn.data('target');
            var $input = $('#' + targetId);
            var $icon = $btn.find('i');
            
            if ($input.attr('type') === 'password') {
                $input.attr('type', 'text');
                $icon.removeClass('mdi-eye-off').addClass('mdi-eye');
            } else {
                $input.attr('type', 'password');
                $icon.removeClass('mdi-eye').addClass('mdi-eye-off');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupPasswordToggle);
    } else {
        setupPasswordToggle();
    }
})();

(function() {
    function initializeSummernote() {
        if (typeof $.fn.summernote === 'undefined') {
            return;
        }

        $('.summernote').each(function() {
            var $element = $(this);
            
            if ($element.hasClass('note-editor')) {
                return;
            }

            $element.summernote({
                height: 200,
                minHeight: 150,
                maxHeight: 400,
                focus: false,
                lang: 'id-ID',
                placeholder: $element.attr('placeholder') || 'Ketik di sini...',
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                    ['fontname', ['fontname']],
                    ['fontsize', ['fontsize']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']]
                ],
                fontNames: [
                    'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 
                    'Helvetica', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'
                ],
                fontSizes: [
                    '8', '9', '10', '11', '12', '14', '16', '18', 
                    '20', '22', '24', '28', '32', '36', '48', '64'
                ],
                callbacks: {
                    onInit: function() {
                        console.log('Summernote initialized for:', $element.attr('id') || 'unnamed element');
                    },
                    onImageUpload: function() {
                        if (window.AppUI && typeof window.AppUI.showMessageModal === 'function') {
                            window.AppUI.showMessageModal('Gambar tidak diperbolehkan pada kolom ini.', 'Peringatan');
                        }
                        return false;
                    },
                    onPaste: function(e) {
                        // Strip any pasted images
                        var clipboardData = (e.originalEvent || e).clipboardData;
                        if (clipboardData && clipboardData.items) {
                            for (var i = 0; i < clipboardData.items.length; i++) {
                                if (clipboardData.items[i].type && clipboardData.items[i].type.indexOf('image') === 0) {
                                    e.preventDefault();
                                    if (window.AppUI && typeof window.AppUI.showMessageModal === 'function') {
                                        window.AppUI.showMessageModal('Menempel gambar tidak diperbolehkan pada kolom ini.', 'Peringatan');
                                    }
                                    return false;
                                }
                            }
                        }
                    },
                    onChange: function(contents, $editable) {
                        $element.val(contents);
                        
                        if (contents && contents.trim() !== '' && contents !== '<p><br></p>') {
                            $element.closest('.form-group').removeClass('summernote-error');
                        }
                    },
                    onBlur: function() {
                        validateSummernoteContent($element);
                    }
                }
            });

            // Prevent dropping images into the editor
            $element.next('.note-editor').on('drop', function(e) {
                var dt = e.originalEvent && e.originalEvent.dataTransfer;
                if (dt && dt.files) {
                    for (var i = 0; i < dt.files.length; i++) {
                        if (dt.files[i].type && dt.files[i].type.indexOf('image') === 0) {
                            e.preventDefault();
                            if (window.AppUI && typeof window.AppUI.showMessageModal === 'function') {
                                window.AppUI.showMessageModal('Menjatuhkan gambar tidak diperbolehkan pada kolom ini.', 'Peringatan');
                            }
                            return false;
                        }
                    }
                }
            });
        });
    }

    function validateSummernoteContent($element) {
        var content = $element.summernote('code');
        var textContent = $('<div>').html(content).text().trim();
        var $formGroup = $element.closest('.form-group');
        
        if (textContent === '' || content === '<p><br></p>') {
            $formGroup.addClass('summernote-error');
            return false;
        } else {
            $formGroup.removeClass('summernote-error');
            return true;
        }
    }

    function setupSummernoteValidation() {
        $(document).on('submit', 'form', function(e) {
            var hasEmptyFields = false;
            var $form = $(this);
            
            $form.find('.summernote').each(function() {
                var $element = $(this);
                var isValid = validateSummernoteContent($element);
                
                if (!isValid) {
                    hasEmptyFields = true;
                }
            });
            
            if (hasEmptyFields) {
                e.preventDefault();
                
                alert('Mohon isi semua field yang wajib diisi');
                
                var $firstEmpty = $form.find('.summernote-error .summernote').first();
                if ($firstEmpty.length) {
                    $firstEmpty.summernote('focus');
                    
                    $('html, body').animate({
                        scrollTop: $firstEmpty.offset().top - 100
                    }, 500);
                }
                
                return false;
            }
        });
    }

    function setupCandidateDetailModal() {
        $(document).on('click', '.btn-detail', function() {
            var candidateId = $(this).data('id');
            $.get('/panitia/kandidat/detail/' + candidateId)
                .done(function(data){
                    $('#modalCandidateNumber').text(data.candidate_number || '');
                    $('#modalChairName').text(data.chair_candidate_name || '');
                    $('#modalViceName').text(data.vice_chair_candidate_name || '');
                    if (data.candidate_photo) {
                        $('#modalCandidatePhoto').attr('src', '/images/candidates/' + data.candidate_photo).show();
                    } else {
                        $('#modalCandidatePhoto').hide();
                    }
                    $('#modalVision').html(data.vision || '<em class="text-muted">Belum ada visi</em>');
                    $('#modalMission').html(data.mission || '<em class="text-muted">Belum ada misi</em>');
                    $('#modalWorkProgram').html(data.work_program || '<em class="text-muted">Belum ada program kerja</em>');
                    $('#modalDetailCandidate').modal('show');
                })
                .fail(function(){
                    alert('Gagal memuat detail kandidat');
                });
        });
    }

    function setupImagePreview() {
        $(document).on('change', 'input[type="file"][accept*="image"]', function() {
            var file = this.files[0];
            var $preview = $('#photo-preview');
            var $previewImg = $('#preview-image');
            var $currentPhoto = $('#current-photo');
            
            if (file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $previewImg.attr('src', e.target.result);
                    $preview.show();
                    
                    if ($currentPhoto.length) {
                        $currentPhoto.hide();
                    }
                };
                reader.readAsDataURL(file);
            } else {
                $preview.hide();
                if ($currentPhoto.length) {
                    $currentPhoto.show();
                }
            }
        });

        $(document).on('click', 'img[style*="cursor: pointer"]', function() {
            var imageSrc = $(this).attr('src');
            $('#modal-preview-image').attr('src', imageSrc);
            $('#imagePreviewModal').modal('show');
        });

        $(document).on('click', 'img[data-current-photo]', function() {
            var photoName = $(this).data('current-photo');
            var imageSrc = '/images/candidates/' + photoName;
            $('#modal-preview-image').attr('src', imageSrc);
            $('#imagePreviewModal').modal('show');
        });
    }

    function setupSummernoteDestroy() {
        $(window).on('beforeunload', function() {
            $('.summernote').each(function() {
                if ($(this).hasClass('note-editor')) {
                    $(this).summernote('destroy');
                }
            });
        });
    }

    function initializeAll() {
        initializeSummernote();
        setupSummernoteValidation();
        setupCandidateDetailModal();
        setupImagePreview();
        setupSummernoteDestroy();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAll);
    } else {
        initializeAll();
    }

    $(document).on('DOMNodeInserted', function(e) {
        var $target = $(e.target);
        if ($target.hasClass('summernote') || $target.find('.summernote').length) {
            setTimeout(function() {
                initializeSummernote();
            }, 100);
        }
    });

    window.SummernoteHelper = {
        initialize: initializeSummernote,
        validate: function() {
            var isValid = true;
            $('.summernote').each(function() {
                if (!validateSummernoteContent($(this))) {
                    isValid = false;
                }
            });
            return isValid;
        },
        destroy: function() {
            $('.summernote').each(function() {
                if ($(this).hasClass('note-editor')) {
                    $(this).summernote('destroy');
                }
            });
        }
    };
})();